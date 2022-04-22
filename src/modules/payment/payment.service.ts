import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePaymentPayload } from 'mercadopago/models/payment/create-payload.model';
import { Model, Types } from 'mongoose';
import { OrderService } from '../order/order.service';
import { OrderStatus } from '../order/schema/order.schema';
import { PaidMarketService } from '../paid-market/paid-market.service';
import { SocketService } from '../socket/socket.service';
import { Payment, PaymentModel } from './schema/payment.schema';
import { PaymentStatus } from './schema/payment.schema';

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Payment.name) private readonly paymentModel: Model<PaymentModel>,
        private readonly paidMarketService: PaidMarketService,
        private readonly socketService: SocketService,
        private readonly orderService: OrderService,
    ) { }

    async getPayments(): Promise<PaymentModel[]> {
        return await this.paymentModel.find().populate({ path: 'order_id', model: 'Order' });
    }

    async getPayment(id: string): Promise<PaymentModel> {
        return await this.paymentModel.findById(id).populate({ path: 'order_id', model: 'Order' });
    }

    async paymentNotification(body: any) {
        const { data: { id }} = body;

        const payment = await this.paidMarketService.getPayment(id);

        const { body: { id: paymentId , status, metadata: { order_id } }} = payment;

        if(payment && status === PaymentStatus.aprroved) {
            
            const foundOrder = await this.orderService.getOrder(order_id);
            foundOrder.status = OrderStatus.in_process;

            if(foundOrder) {
                await this.orderService.updateOrder(foundOrder.id, foundOrder);
            }

            return this.socketService.socket.emit('receivedPix', { id: paymentId, status: PaymentStatus.aprroved });
        }
            
        return this.socketService.socket.emit('receivedPix', { id: paymentId, error: 'Ops, algo deu errado.', status });
    }

    async getPaidMarketPayment(id: number) {
        return await this.paidMarketService.getPayment(id);
    }

    async calcelPaidMarketPayment(id: number) {
        return await this.paidMarketService.cancelPayment(id);
    }

    async createPayment(payment: CreatePaymentPayload): Promise<any> {
        
        const paidMarketResponse = await this.paidMarketService.savePayment(payment);

        if(paidMarketResponse) {
            const {
                status,
                transaction_amount,
                installments,
                payment_method_id,
                payment_type_id,
                metadata,
            } = paidMarketResponse.body;

            let paymentData: Payment = {
                amount: transaction_amount,
                payment_method_code: payment_method_id,
                payment_type: payment_type_id,
                order_id: metadata.order_id,
                status,
                installments,
                pix_qr_code: undefined,
                pix_qr_code64: undefined,
            }

            if(payment_method_id === 'pix') {
                const { 
                    point_of_interaction: { 
                        transaction_data: { 
                            qr_code, 
                            qr_code_base64 
                        }
                    }
                } = paidMarketResponse.body;

                paymentData.pix_qr_code = qr_code;
                paymentData.pix_qr_code64 = qr_code_base64;
            }

            const newPayment = await this.paymentModel.create(paymentData);

            return newPayment;
        }
    }

    async updatePayment(id: string, payment: PaymentModel): Promise<PaymentModel> {
        const foundPayment = await this.paymentModel.findById(id);

        if (!foundPayment) {
            return;
        }

        await this.paymentModel.updateOne({ _id: Types.ObjectId(id) }, payment);

        return await this.getPayment(id);
    }

    async deletePayment(id: string): Promise<boolean> {
        const foundPayment = this.paymentModel.findById(id);

        if (!foundPayment) {
            return false;
        }

        await foundPayment.deleteOne({ _id: id });
        return true;
    }
}
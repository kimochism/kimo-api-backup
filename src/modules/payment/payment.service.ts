import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreatePaymentPayload } from "mercadopago/models/payment/create-payload.model";
import { Model, Types } from "mongoose";
import { PaidMarketService } from "../paid-market/paid-market.service";
import { Payment, PaymentModel } from "./schema/payment.schema";

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Payment.name) private readonly paymentModel: Model<PaymentModel>,
        private readonly paidMarketService: PaidMarketService
    ) { }

    async getPayments(): Promise<PaymentModel[]> {
        return await this.paymentModel.find().populate({ path: 'order_id', model: 'Order' });
    }

    async getPayment(id: string): Promise<PaymentModel> {
        return await this.paymentModel.findById(id).populate({ path: 'order_id', model: 'Order' });
    }

    async createPayment(payment: CreatePaymentPayload): Promise<any> {

        const paidMarketResponse = await this.paidMarketService.savePayment(payment)

        if(paidMarketResponse) {
            const {
                status,
                transaction_amount,
                installments,
                payment_method_id,
                payment_type_id,
                metadata
            } = paidMarketResponse.body;

            const newPayment = await this.paymentModel.create({
                amount: transaction_amount,
                payment_method_code: payment_method_id,
                payment_type: payment_type_id,
                order_id: metadata.order_id,
                status,
                installments
            });

            if(payment_type_id === 'credit_card') {

                console.log('Que');
                return newPayment;
            }

            return paidMarketResponse;
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
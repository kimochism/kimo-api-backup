import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Payment, PaymentDocument } from "./schema/payment.schema";

@Injectable()
export class PaymentService {
    constructor(@InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument>) { }

    async getPayments(): Promise<Payment[]> {
        return await this.paymentModel.find().populate({ path: 'order_id', model: 'Order'});
    }

    async getPayment(id: string): Promise<Payment> {
        return await this.paymentModel.findById(id).populate({ path: 'order_id', model: 'Order'});
    }

    async createPayment(payment: Payment): Promise<Payment> {
        const newPayment = await this.paymentModel.create(payment);
        return newPayment;
    }

    async updatePayment(id: string, payment: Payment): Promise<Payment> {
        const foundPayment = await this.paymentModel.findById(id);

        if (!foundPayment) {
            return;
        }

        await this.paymentModel.updateOne({_id: Types.ObjectId(id)}, payment);

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
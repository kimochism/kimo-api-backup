import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderModel } from './schema/order.schema';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<OrderModel>,
    ) { }

    async getOrders(): Promise<OrderModel[]> {
        const orders = this.orderModel
            .find()
            .populate({ path: 'products', model: 'Product'})
            .exec();

        return orders;
    }

    async getOrder(id: string): Promise<OrderModel> {
        return await this.orderModel.findById(id).populate({ path: 'products', model: 'Product'}).exec();
    }

    async createOrder(order: OrderModel): Promise<OrderModel> {
        const newOrder = await this.orderModel.create(order);
        return newOrder;
    }

    async updateOrder(id: string, order: OrderModel): Promise<OrderModel> {
        const foundOrder = await this.orderModel.findById(id);

        if (!foundOrder) {
            return;
        }

        await this.orderModel.updateOne({_id: Types.ObjectId(id)}, order);

        return await this.getOrder(id);
    }

    async deleteOrder(id: string): Promise<boolean> {
        const foundOrder = this.orderModel.findById(id);

        if (!foundOrder) {
            return false;
        }

        await foundOrder.deleteOne({ _id: id });
        return true;
    }
}
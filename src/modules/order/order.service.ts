import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Order, OrderDocument } from "./schema/order.schema";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    ) { }

    async getOrders(): Promise<Order[]> {
        const orders = this.orderModel
            .find()
            .populate({ path: 'products', model: 'Product'})
            .exec();

        return orders;
    }

    async getOrder(id: string): Promise<Order> {
        return await this.orderModel.findById(id).populate({ path: 'products', model: 'Product'}).exec();
    }

    async createOrder(order: Order): Promise<Order> {
        const newOrder = await this.orderModel.create(order);
        return newOrder;
    }

    async updateOrder(id: string, order: Order): Promise<Order> {
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
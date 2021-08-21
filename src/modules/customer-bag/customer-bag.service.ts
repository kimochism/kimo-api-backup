import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CustomerBag, CustomerBagDocument } from "./schema/customer-bag.schema";

@Injectable()
export class CustomerBagService {
    constructor(
        @InjectModel(CustomerBag.name) private readonly customerBagModel: Model<CustomerBagDocument>,
    ) { }

    async getCustomerBags(): Promise<CustomerBag[]> {
        return await this.customerBagModel.find().exec();
    }

    async getCustomerBag(id: string): Promise<CustomerBag> {
        return await this.customerBagModel.findById(id).exec();
    }

    async createCustomerBag(customerBag: CustomerBag): Promise<any> {

        const newCustomerBag = await this.customerBagModel.create(customerBag);

        newCustomerBag.save();
        return newCustomerBag;
    }

    async updateCustomerBag(id: string, customerBag: CustomerBag): Promise<CustomerBag> {
        const foundCustomerBag = await this.customerBagModel.findById(id);

        if (!foundCustomerBag) {
            return;
        }

        await this.customerBagModel.updateOne({_id: Types.ObjectId(id)}, customerBag);

        return await this.getCustomerBag(id);
    }

    async deleteCustomerBag(id: string): Promise<boolean> {
        const foundCustomerBag = this.customerBagModel.findById(id);

        if (!foundCustomerBag) {
            return false;
        }

        await foundCustomerBag.deleteOne({ _id: id });
        return true;
    }
}
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Customer, CustomerDocument } from "./schema/customer.schema";

@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>) { }

    async getCustomers(): Promise<Customer[]> {
        return await this.customerModel.find({});
    }

    async getCustomer(id: string): Promise<Customer> {
        return await this.customerModel.findById(id);
    }

    async createCustomer(customer: Customer): Promise<Customer> {
        const newCustomer = await this.customerModel.create(customer);
        return newCustomer;
    }

    async updateCustomer(id: string, customer: Customer): Promise<Customer> {
        const foundCustomer = await this.customerModel.findById(id);

        if (!foundCustomer) {
            return;
        }

        await this.customerModel.updateOne({_id: Types.ObjectId(id)}, customer);

        return await this.getCustomer(id);
    }

    async deleteCustomer(id: string): Promise<boolean> {
        const foundCustomer = this.customerModel.findById(id);

        if (!foundCustomer) {
            return false;
        }

        await foundCustomer.deleteOne({ _id: id });
        return true;
    }
}
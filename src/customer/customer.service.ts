import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer, CustomerDocument } from "./schema/Customer.schema";

@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>) { }

    async index(): Promise<Customer[]> {
        return await this.customerModel.find();
    }

    async findOne(id: string): Promise<Customer> {
        return await this.customerModel.findById(id);
    }

    async create(customer: Customer): Promise<Customer> {
        const newCustomer = await this.customerModel.create(customer);
        return newCustomer;
    }
}
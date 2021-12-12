import { Injectable, NotFoundException, NotAcceptableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Customer, CustomerModel,  } from "./schema/customer.schema";

@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer.name) private readonly customerModel: Model<CustomerModel>) { }

    async getCustomers(): Promise<CustomerModel[]> {
        return await this.customerModel.find().populate({ path: 'address', model: 'Address'});
    }

    async getCustomer(id: string): Promise<CustomerModel> {
        const foundCustomer = await this.customerModel.findById(id).exec();

        if(foundCustomer) return foundCustomer;
        throw new NotFoundException(`Não foi possível encontrar cliente com id '${id}'.`);
    }

    async getCustomerByUser(user_id: string): Promise<CustomerModel> {
        return await this.customerModel.findOne({ user_id }).populate({ path: 'address', model: 'Address'});
    }

    async createCustomer(customer: CustomerModel): Promise<CustomerModel> {

        const foundCustomerByUser = await this.getCustomerByUser(customer.user_id);

        if(foundCustomerByUser) {
            if(foundCustomerByUser.document === customer.document) throw new NotAcceptableException('CPF já cadastrado.');
            
            throw new NotAcceptableException(`Email já cadastrado.`);
        }

        if(!foundCustomerByUser) {
            const foundCustomerByCpf = await this.customerModel.findOne({ document: customer.document });

            if(foundCustomerByCpf) throw new NotAcceptableException('CPF já cadastrado.');
        }

        const newCustomer = await this.customerModel.create(customer);
        return newCustomer;
    }

    async updateCustomer(id: string, customer: CustomerModel): Promise<CustomerModel> {
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
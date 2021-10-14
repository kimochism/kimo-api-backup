import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CustomerService } from "../customer/customer.service";
import { UserService } from "../user/user.service";
import { CustomerBag, CustomerBagDocument } from "./schema/customer-bag.schema";

@Injectable()
export class CustomerBagService {
    constructor(
        @InjectModel(CustomerBag.name) private readonly customerBagModel: Model<CustomerBagDocument>,
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
        @Inject(forwardRef(() => CustomerService)) private readonly customerService: CustomerService
    ) { }

    async getCustomerBags(email: string): Promise<CustomerBag[]> {

        const foundUser = await this.userService.getUserByEmail(email);

        if (foundUser) {
            const foundCustomer = await this.customerService.getCustomerByUser(foundUser.id as unknown as string);

            if (foundCustomer) {
                const customerBags = await this.customerBagModel
                    .find({ customer: foundCustomer.id })
                    .populate({ path: 'customer', model: 'Customer' })
                    .populate({ path: 'product', model: 'Product', populate: { path: 'images', model: 'Image' } })
                    .exec();

                return customerBags;
            }
        }
    }

    async getCustomerBag(id: string): Promise<CustomerBag> {
        return await this.customerBagModel.findById(id).exec();
    }

    async createCustomerBag(customerBag: any): Promise<any> {

        const foundUser = await this.userService.getUserByEmail(customerBag.email);

        if (foundUser) {
            const foundCustomer = await this.customerService.getCustomerByUser(foundUser.id as unknown as string);

            if (foundCustomer) {

                customerBag.customer = foundCustomer.id as unknown as string;

                const newCustomerBag = await this.customerBagModel.create(customerBag);

                newCustomerBag.save();

                return newCustomerBag;
            }
        }

        return 'Usuário não encontrado';
    }

    async updateCustomerBag(id: string, customerBag: CustomerBag): Promise<CustomerBag> {
        const foundCustomerBag = await this.customerBagModel.findById(id);

        if (!foundCustomerBag) {
            return;
        }

        await this.customerBagModel.updateOne({ _id: Types.ObjectId(id) }, customerBag);

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
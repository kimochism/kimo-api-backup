import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CustomerService } from "../customer/customer.service";
import { CustomerModel } from "../customer/schema/customer.schema";
import { ProductModel } from "../product/schema/product.schema";
import { UserService } from "../user/user.service";
import { CustomerBag, CustomerBagModel } from "./schema/customer-bag.schema";

@Injectable()
export class CustomerBagService {
    constructor(
        @InjectModel(CustomerBag.name) private readonly customerBagModel: Model<CustomerBagModel>,
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
        @Inject(forwardRef(() => CustomerService)) private readonly customerService: CustomerService
    ) { }

    async getCustomerBags(email: string): Promise<CustomerBagModel[]> {

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

    async getCustomerBag(id: string): Promise<CustomerBagModel> {
        return await this.customerBagModel.findById(id).exec();
    }

    async createCustomerBag(customerBag: any): Promise<any> {

        const foundUser = await this.userService.getUserByEmail(customerBag.email);

        if (foundUser) {
            const foundCustomer = await this.customerService.getCustomerByUser(foundUser.id as unknown as string);

            if (foundCustomer) {

                customerBag.customer = foundCustomer.id as unknown as string;

                const customerBags = await this.getCustomerBags(customerBag.email);

                let customerBagExists = false;
                customerBags.map(async cb => {
                    if ((cb.customer as unknown as CustomerModel).id == foundCustomer.id as unknown as string
                        && (cb.product as unknown as ProductModel).id == customerBag.product
                        && cb.options.color.name == customerBag.options.color.name
                        && cb.options.size == customerBag.options.size) {

                        cb.quantity += customerBag.quantity;
                        customerBagExists = true;

                        return await this.customerBagModel.updateOne({ _id: Types.ObjectId(cb.id) }, { $set: { quantity: cb.quantity } }).exec();
                    }
                });

                if (customerBagExists) return;

                const newCustomerBag = await this.customerBagModel.create(customerBag);

                newCustomerBag.save();

                return newCustomerBag;
            }
        }

        return 'Usuário não encontrado';
    }

    async updateCustomerBag(id: string, customerBag: CustomerBagModel): Promise<CustomerBagModel> {
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
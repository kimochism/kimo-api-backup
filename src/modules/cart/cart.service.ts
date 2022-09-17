import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CustomerService } from '../customer/customer.service';
import { CustomerModel } from '../customer/schema/customer.schema';
import { ProductModel } from '../product/schema/product.schema';
import { UserService } from '../user/user.service';
import { Cart, CartModel } from './schema/cart.schema';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name) private readonly cartModel: Model<CartModel>,
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
        @Inject(forwardRef(() => CustomerService)) private readonly customerService: CustomerService
    ) { }

    async getCarts(email: string): Promise<CartModel[]> {

        const foundUser = await this.userService.getUserByEmail(email);

        if (foundUser) {
            const foundCustomer = await this.customerService.getCustomerByUser(foundUser.id as unknown as string);

            if (foundCustomer) {
                const carts = await this.cartModel
                    .find({ customer: foundCustomer.id })
                    .populate({ path: 'customer', model: 'Customer' })
                    .populate({ path: 'product', model: 'Product', populate: { path: 'images', model: 'Image' } })
                    .exec();

                return carts;
            }
        }
    }

    async getCart(id: string): Promise<CartModel> {
        return await this.cartModel.findById(id).exec();
    }

    async createCart(cart: any): Promise<any> {

        const foundUser = await this.userService.getUserByEmail(cart.email);

        if (foundUser) {
            const foundCustomer = await this.customerService.getCustomerByUser(foundUser.id as unknown as string);

            if (foundCustomer) {

                cart.customer = foundCustomer.id as unknown as string;

                const carts = await this.getCarts(cart.email);

                let cartExists = false;
                carts.map(async cart => {
                    if ((cart.customer as unknown as CustomerModel).id == foundCustomer.id as unknown as string
                        && (cart.product as unknown as ProductModel).id == cart.product
                        && cart.options.color.name == cart.options.color.name
                        && cart.options.size == cart.options.size) {

                        cart.quantity += cart.quantity;
                        cartExists = true;

                        return await this.cartModel.updateOne({ _id: Types.ObjectId(cart.id) }, { $set: { quantity: cart.quantity } }).exec();
                    }
                });

                if (cartExists) return;

                const newCart = await this.cartModel.create(cart);

                newCart.save();

                return newCart;
            }
        }

        return 'User not found';
    }

    async updateCart(id: string, cart: CartModel): Promise<CartModel> {
        const foundCart = await this.cartModel.findById(id);

        if (!foundCart) {
            return;
        }

        await this.cartModel.updateOne({ _id: Types.ObjectId(id) }, cart);

        return await this.getCart(id);
    }

    async deleteCart(id: string): Promise<boolean> {
        const cart = this.cartModel.findById(id);

        if (!cart) return false;

        await cart.deleteOne({ _id: id });
        
        return true;
    }
}
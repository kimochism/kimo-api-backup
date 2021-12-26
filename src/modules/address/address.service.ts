import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Address, AddressModel } from './schema/address.schema';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(Address.name) private readonly addressModel: Model<AddressModel>,
    ) { }

    async getAllAddresss(): Promise<AddressModel[]> {
        const allAddresss = this.addressModel.find({});

        return allAddresss;
    }

    async getAddress(id: string): Promise<AddressModel> {
        const address = await this.addressModel.findById(id);

        return address;
    }

    async getAddressesByCustomer(customer_id: string): Promise<AddressModel[]> {
        const addresses = await this.addressModel.find({ customer_id });

        return addresses;
    }

    async createAddress(address: AddressModel): Promise<AddressModel> {
        const newAddress = await this.addressModel.create(address);
        return newAddress;
    }

    async updateAddress(id: string, address: AddressModel): Promise<AddressModel> {
        const foundAddress = await this.addressModel.findById(id);

        if (!foundAddress) {
            return;
        }

        await this.addressModel.updateOne({_id: Types.ObjectId(id)}, address);

        return await this.getAddress(id);
    }

    async deleteAddress(id: string): Promise<boolean> {
        const foundAddress = this.addressModel.findById(id);

        if (!foundAddress) {
            return false;
        }

        await foundAddress.deleteOne({ _id: id });
        return true;
    }
}
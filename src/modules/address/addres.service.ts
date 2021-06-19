import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Address, AddressDocument } from "./schema/address.schema";

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(Address.name) private readonly addressModel: Model<AddressDocument>,
    ) { }

    async getAllAddresss(): Promise<Address[]> {
        const allAddresss = this.addressModel.find({});

        return allAddresss;
    }

    async getAddress(id: string): Promise<Address> {
        const address = await this.addressModel.findById(id);

        return address;
    }

    async createAddress(address: Address): Promise<Address> {
        const newAddress = await this.addressModel.create(address);
        return newAddress;
    }

    async updateAddress(id: string, address: Address): Promise<Address> {
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
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./schema/user.schema";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async getUsers(): Promise<User[]> {
        return await this.userModel.find();
    }

    async getUser(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }

    async createUser(user: User): Promise<User> {
        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
        const newUser = await this.userModel.create(user);
        return newUser;
    }

    async updateUser(id: string, user: User): Promise<User> {
        const foundUser = await this.userModel.findById(id).exec();

        if (!foundUser) {
            return;
        }

        await this.userModel.updateOne({ _id: Types.ObjectId(id) }, user);

        return await this.getUser(id);
    }

    async deleteUser(id: string): Promise<boolean> {
        const foundUser = this.userModel.findById(id);

        if (!foundUser) {
            return false;
        }

        await this.userModel.deleteOne({ _id: id }).exec();
        return true;
    }
}
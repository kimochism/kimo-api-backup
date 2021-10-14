import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserModel } from "./schema/user.schema";
import * as bcrypt from 'bcrypt';
import { redis } from '../../redis';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserModel>) { }

    async getUsers(): Promise<UserModel[]> {
        return await this.userModel.find();
    }

    async getUser(id: string): Promise<UserModel> {
        const foundUser = await this.userModel.findById(id).exec();

        if(foundUser) return foundUser;
        throw new NotFoundException(`Não foi possível encontrar usuário com id '${id}'.`);
    }

    async getUserByEmail(email: string): Promise<UserModel> {
        const foundUser = await this.userModel.findOne({ email }).exec();
        if(foundUser) return foundUser;
        throw new NotFoundException(`Não foi possível encontrar usuário com email '${email}'.`);
    }

    async createUser(user: UserModel): Promise<UserModel> {
        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
        const newUser = await this.userModel.create(user);

        return this.getUser(newUser.id);
    }

    async updateUser(id: string, user: UserModel): Promise<UserModel> {
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

    async confirmEmailUser(id: string): Promise<boolean> {

        redis.get(id, async (err, result) => {
            if (err) {
                return false;
            } else {
                await this.userModel.updateOne({ _id: Types.ObjectId(result) }, { $set: { email_verified: true } });
                return true;
            }
        });
        return true;
    }
}
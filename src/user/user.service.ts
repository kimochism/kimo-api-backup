import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schema/user.schema";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async index(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(email: string): Promise<User> {
        return await this.userModel.findOne({ email });
    }

    async create(user: User): Promise<User> {
        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
        const newUser = await this.userModel.create(user);
        return newUser;
    }
}
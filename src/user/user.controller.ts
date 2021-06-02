import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from "./schema/user.schema";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async index(): Promise<User[]> {
        return this.userService.index();
    }

    @Get(':email')
    async findOne(@Param('email') email: string): Promise<User> {
        return this.userService.findOne(email);
    }

    @Post()
    async create(@Body() user: { email: string, password: string }): Promise<User> {
        return this.userService.create(user);
    }

    // @Put()

    // async update(@Body user: { _id: string }): Promise<User> {
    //     return this.userService.
    // }

}
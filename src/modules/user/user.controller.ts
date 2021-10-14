import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserModel } from "./schema/user.schema";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUsers(): Promise<UserModel[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserModel> {
        return this.userService.getUser(id);
    }

    @Get('email/:email')
    async getUserByEmail(@Param('email') email: string): Promise<UserModel> {
        return this.userService.getUserByEmail(email);
    }

    @Get('confirm/email/:id')
    async confirmEmailUser(@Param('id') id: string): Promise<boolean> {
        return this.userService.confirmEmailUser(id);
    }

    @Post()
    async createUser(@Body() user: UserModel): Promise<UserModel> {
        return this.userService.createUser(user);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: UserModel): Promise<UserModel> {
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<boolean> {
        return this.userService.deleteUser(id);
    }

}
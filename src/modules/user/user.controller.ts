import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { User } from "./schema/user.schema";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUser(id);
    }

    @Get('email/:email')
    async getUserByEmail(@Param('email') email: string): Promise<User> {
        return this.userService.getUserByEmail(email);
    }

    @Post()
    async createUser(@Body() user: User): Promise<User> {
        return this.userService.createUser(user);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<boolean> {
        return this.userService.deleteUser(id);
    }

}
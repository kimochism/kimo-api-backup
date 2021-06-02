import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Customer } from "./schema/Customer.schema";
import { CustomerService } from "./Customer.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    async index(): Promise<Customer[]> {
        return this.customerService.index();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() customer: {
            document: string,
            full_name: string,
            cell_phone_number: string,
            birth_date: Date
            user_id: string,
        }): Promise<Customer> {
        return this.customerService.create(customer);
    }

    // @Put()

    // async update(@Body Customer: { _id: string }): Promise<Customer> {
    //     return this.customerService.
    // }

}
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Customer } from "./schema/customer.schema";

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    async getCustomers(): Promise<Customer[]> {
        return this.customerService.getCustomers();
    }

    @Get(':id')
    async getCustomer(@Param() id: string): Promise<Customer> {
        return this.customerService.getCustomer(id);
    }

    @Post()
    async createCustomer(@Body() customer: Customer): Promise<Customer> {
        return this.customerService.createCustomer(customer);
    }

    @Put(':id')
    async updateCustomer(@Param('id') id: string, @Body() customer: Customer): Promise<Customer>{
        return this.customerService.updateCustomer(id, customer);
    }

    @Delete(':id')
    async deleteCustomer(@Param('id') id: string): Promise<boolean> {
        return this.customerService.deleteCustomer(id);
    }

}
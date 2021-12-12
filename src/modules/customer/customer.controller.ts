import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { Customer, CustomerModel } from "./schema/customer.schema";

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCustomers(): Promise<CustomerModel[]> {
        return this.customerService.getCustomers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getCustomer(@Param('id') id: string): Promise<CustomerModel> {
        return this.customerService.getCustomer(id);
    }

    @Get('user/:id')
    async getCustomerByUser(@Param('id') id: string): Promise<CustomerModel> {
        return this.customerService.getCustomerByUser(id);
    }

    @Post()
    async createCustomer(@Body() customer: CustomerModel): Promise<CustomerModel> {
        return this.customerService.createCustomer(customer);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateCustomer(@Param('id') id: string, @Body() customer: CustomerModel): Promise<CustomerModel>{
        return this.customerService.updateCustomer(id, customer);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCustomer(@Param('id') id: string): Promise<boolean> {
        return this.customerService.deleteCustomer(id);
    }

}
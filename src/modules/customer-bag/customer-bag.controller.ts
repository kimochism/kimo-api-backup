import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CustomerBagService } from "./customer-bag.service";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { CustomerBag } from "./schema/customer-bag.schema";
import { Request } from "express";

@Controller('customerBags')
export class CustomerBagController {
    constructor(private readonly customerBagService: CustomerBagService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/email/:email')
    async getCustomerBags(@Param('email') email: string): Promise<CustomerBag[]> {
        return this.customerBagService.getCustomerBags(email);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getCustomerBag(@Param('id') id: string): Promise<CustomerBag> {
        return this.customerBagService.getCustomerBag(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createCustomerBag(@Body() customerBag: CustomerBag): Promise<CustomerBag> {
        return this.customerBagService.createCustomerBag(customerBag);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateCustomerBag(@Param('id') id: string, @Body() CustomerBag: CustomerBag): Promise<CustomerBag>{
        return this.customerBagService.updateCustomerBag(id, CustomerBag);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCustomerBag(@Param('id') id: string): Promise<boolean> {
        return this.customerBagService.deleteCustomerBag(id);
    }

}
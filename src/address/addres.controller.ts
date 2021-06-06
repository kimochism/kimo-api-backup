import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AddressService } from "./addres.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Address } from "./schema/address.schema";

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Get()
    async getAllAddress(): Promise<Address[]> {
        return this.addressService.getAllAddresss();
    }

    @Get(':id')
    async getAddress(@Param('id') id: string): Promise<Address> {
        return this.addressService.getAddress(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createAddress(@Body() Address: Address): Promise<Address> {
        return this.addressService.createAddress(Address);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateAddress(@Param('id') id: string, @Body() Address: Address): Promise<Address>{
        return this.addressService.updateAddress(id, Address);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteAddress(@Param('id') id: string): Promise<boolean> {
        return this.addressService.deleteAddress(id);
    }

}
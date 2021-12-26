import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AddressModel } from './schema/address.schema';

@Controller('addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Get()
    async getAllAddress(): Promise<AddressModel[]> {
        return this.addressService.getAllAddresss();
    }

    @Get(':id')
    async getAddress(@Param('id') id: string): Promise<AddressModel> {
        return this.addressService.getAddress(id);
    }

    @Get('customer/:id')
    async getAddressesByCustomer(@Param('id') id: string): Promise<AddressModel[]> {
        return this.addressService.getAddressesByCustomer(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createAddress(@Body() address: AddressModel): Promise<AddressModel> {
        return this.addressService.createAddress(address);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateAddress(@Param('id') id: string, @Body() Address: AddressModel): Promise<AddressModel>{
        return this.addressService.updateAddress(id, Address);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteAddress(@Param('id') id: string): Promise<boolean> {
        return this.addressService.deleteAddress(id);
    }

}
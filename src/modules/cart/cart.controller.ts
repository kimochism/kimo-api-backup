import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CartModel } from './schema/cart.schema';

@Controller('carts')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/email/:email')
    async getCarts(@Param('email') email: string): Promise<CartModel[]> {
        return this.cartService.getCarts(email);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getCart(@Param('id') id: string): Promise<CartModel> {
        return this.cartService.getCart(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createCart(@Body() cart: CartModel): Promise<CartModel> {
        return this.cartService.createCart(cart);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateCart(@Param('id') id: string, @Body() cart: CartModel): Promise<CartModel>{
        return this.cartService.updateCart(id, cart);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCart(@Param('id') id: string): Promise<boolean> {
        return this.cartService.deleteCart(id);
    }

}
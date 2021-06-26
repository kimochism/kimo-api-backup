import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { Order } from "./schema/order.schema";

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getOrders(): Promise<Order[]> {
        return this.orderService.getOrders();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOrder(@Param('id') id: string): Promise<Order> {
        return this.orderService.getOrder(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createOrder(@Body() order: Order): Promise<Order> {
        return this.orderService.createOrder(order);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateOrder(@Param('id') id: string, @Body() Order: Order): Promise<Order>{
        return this.orderService.updateOrder(id, Order);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteOrder(@Param('id') id: string): Promise<boolean> {
        return this.orderService.deleteOrder(id);
    }

}
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { Payment } from "./schema/payment.schema";

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get()
    async getPayments(): Promise<Payment[]> {
        return this.paymentService.getPayments();
    }

    @Get(':id')
    async getPayment(@Param('id') id: string): Promise<Payment> {
        return this.paymentService.getPayment(id);
    }

    @Post()
    async createPayment(@Body() payment: Payment): Promise<Payment> {
        return this.paymentService.createPayment(payment);
    }

    @Put(':id')
    async updatePayment(@Param('id') id: string, @Body() payment: Payment): Promise<Payment>{
        return this.paymentService.updatePayment(id, payment);
    }

    @Delete(':id')
    async deletePayment(@Param('id') id: string): Promise<boolean> {
        return this.paymentService.deletePayment(id);
    }

}
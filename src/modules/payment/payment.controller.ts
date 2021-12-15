import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { PaymentModel } from "./schema/payment.schema";
import { CreatePaymentPayload } from "mercadopago/models/payment/create-payload.model";

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get()
    async getPayments(): Promise<PaymentModel[]> {
        return this.paymentService.getPayments();
    }

    @Get(':id')
    async getPayment(@Param('id') id: string): Promise<PaymentModel> {
        return this.paymentService.getPayment(id);
    }

    @Post()
    async createPayment(@Body() payment: CreatePaymentPayload): Promise<PaymentModel> {
        return this.paymentService.createPayment(payment);
    }

    @Put(':id')
    async updatePayment(@Param('id') id: string, @Body() payment: PaymentModel): Promise<PaymentModel>{
        return this.paymentService.updatePayment(id, payment);
    }

    @Delete(':id')
    async deletePayment(@Param('id') id: string): Promise<boolean> {
        return this.paymentService.deletePayment(id);
    }

}
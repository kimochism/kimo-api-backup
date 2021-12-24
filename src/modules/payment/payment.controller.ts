import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PaymentModel } from './schema/payment.schema';
import { CreatePaymentPayload } from 'mercadopago/models/payment/create-payload.model';


@Controller('payments')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getPayments(): Promise<PaymentModel[]> {
        return this.paymentService.getPayments();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getPayment(@Param('id') id: string): Promise<PaymentModel> {
        return this.paymentService.getPayment(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPayment(@Body() payment: CreatePaymentPayload): Promise<PaymentModel> {
        return this.paymentService.createPayment(payment);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updatePayment(@Param('id') id: string, @Body() payment: PaymentModel): Promise<PaymentModel>{
        return this.paymentService.updatePayment(id, payment);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletePayment(@Param('id') id: string): Promise<boolean> {
        return this.paymentService.deletePayment(id);
    }

    
    @Post('paymentNotification')
    async paymentNotification(@Body() body: any) {
        this.paymentService.paymentNotification(body);
    }

    @Put('paidMarket/:id')
    async cancelPayment(@Param('id') id: number) {

        console.log(id);
        return await this.paymentService.calcelPaidMarketPayment(id);
    }

    @Get('paidMarket/:id')
    async getPaidMarketPayment(@Param('id') id: number) {
        return await this.paymentService.getPaidMarketPayment(id);
    }
}
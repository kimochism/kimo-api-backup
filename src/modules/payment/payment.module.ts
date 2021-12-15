import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Payment, PaymentSchema } from "./schema/payment.schema";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { PaidMarketModule } from "../paid-market/paid-market.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
        PaidMarketModule
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService],
})

export class PaymentModule {}
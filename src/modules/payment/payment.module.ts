import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Payment, PaymentSchema } from "./schema/payment.schema";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }])],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService],
})

export class PaymentModule {}
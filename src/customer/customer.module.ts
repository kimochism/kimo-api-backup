import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "./schema/Customer.schema";
import { CustomerController } from "./Customer.controller";
import { CustomerService } from "./Customer.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],
    controllers: [CustomerController],
    providers: [CustomerService],
    exports: [CustomerService],
})

export class CustomerModule {}
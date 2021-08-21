import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerBagController } from "./customer-bag.controller";
import { CustomerBagService } from "./customer-bag.service";
import { CustomerBag, CustomerBagSchema } from "./schema/customer-bag.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: CustomerBag.name, schema: CustomerBagSchema }])],
    controllers: [CustomerBagController],
    providers: [CustomerBagService],
    exports: [CustomerBagService],
})

export class CustomerBagModule {}
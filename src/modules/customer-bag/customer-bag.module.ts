import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerModule } from "../customer/customer.module";
import { UserModule } from "../user/user.module";
import { CustomerBagController } from "./customer-bag.controller";
import { CustomerBagService } from "./customer-bag.service";
import { CustomerBag, CustomerBagSchema } from "./schema/customer-bag.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: CustomerBag.name, schema: CustomerBagSchema }]),
        forwardRef(() => UserModule),
        forwardRef(() => CustomerModule)
    ],
    controllers: [CustomerBagController],
    providers: [CustomerBagService],
    exports: [CustomerBagService],
})

export class CustomerBagModule {}
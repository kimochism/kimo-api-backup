import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Address, AddressSchema } from "./schema/address.schema";
import { AddressController } from "./addres.controller";
import { AddressService } from "./addres.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }])],
    controllers: [AddressController],
    providers: [AddressService],
    exports: [AddressService],
})

export class AddressModule {}
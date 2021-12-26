import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './schema/address.schema';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }])],
    controllers: [AddressController],
    providers: [AddressService],
    exports: [AddressService],
})

export class AddressModule {}
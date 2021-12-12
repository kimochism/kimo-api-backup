import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { CollectionModule } from './collection/collection.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { ImageModule } from './image/image.module';
import { CustomerBagModule } from './customer-bag/customer-bag.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { FreightModule } from './freight/freight.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_CONNECTION
    ),
    UserModule,
    AuthModule,
    CustomerModule,
    ProductModule,
    CollectionModule,
    AddressModule,
    OrderModule,
    ImageModule,
    CustomerBagModule,
    PaymentModule,
    FreightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

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
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

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

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kimouser:kimochism25147900@@cluster0.qpbxg.mongodb.net/kimo-db?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,
    CustomerModule,
    ProductModule,
    CollectionModule,
    AddressModule,
    OrderModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

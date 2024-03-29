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
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { FreightModule } from './freight/freight.module';
import { SocketModule } from './socket/socket.module';
import { AppGateway } from './app.gateway';

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
    CartModule,
    PaymentModule,
    FreightModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})

export class AppModule {}

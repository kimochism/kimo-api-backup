import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import firebase from 'firebase';
import firebaseConfig from './config/firebase.config';
global.XMLHttpRequest = require('xhr2');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT || 3333);
  firebase.initializeApp(firebaseConfig);
}
bootstrap();

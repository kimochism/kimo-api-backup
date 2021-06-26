import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import firebase from 'firebase';
import firebaseConfig from './config/firebase.config';
global.XMLHttpRequest = require("xhr2");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
  firebase.initializeApp(firebaseConfig);
}
bootstrap();

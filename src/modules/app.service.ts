import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcome(): string {
    return 'Seja bem vindo à KIMOCHISM API!';
  }
}

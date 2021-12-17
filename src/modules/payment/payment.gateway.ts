import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class PaymentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('paidMarketNotification')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('pixSuccessfull', payload, client.id);
  }

  afterInit(server: Server) {
    this.logger.log(`Init Server: ${server}`);
  }

  handleConnection(client: Socket) {
    this.logger.log( `Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log( `Client disconnected: ${client.id}`);
  }
}
import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket/socket.service';
@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private socketService: SocketService) {}
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('paymentNotification')
  handlePaymentNotification(client: Socket, payload: any) {
    this.server.emit('receivedPix', payload, client.id);
  }

  afterInit(server: Server) {
    this.logger.log(`Init Server: ${server}`);
    this.socketService.socket = server;
  }

  handleConnection(client: Socket) {
    this.logger.log( `Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log( `Client disconnected: ${client.id}`);
  }
}
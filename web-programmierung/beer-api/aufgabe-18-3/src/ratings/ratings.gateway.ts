import { Inject, forwardRef } from '@nestjs/common';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RatingsService } from './ratings.service';

@WebSocketGateway()
export class RatingsGateway implements OnGatewayConnection {
  // Der socket.io-Server; emit sendet an alle verbundenen Clients
  @WebSocketServer()
  server: Server;

  // Der Service injiziert das Gateway: forwardRef auf beiden Seiten
  constructor(
    @Inject(forwardRef(() => RatingsService))
    private readonly ratingsService: RatingsService,
  ) {}

  // Neue Verbindung: das aktuelle Ranking nur an diesen Client
  async handleConnection(client: Socket) {
    client.emit('ranking', await this.ratingsService.ranking());
  }
}

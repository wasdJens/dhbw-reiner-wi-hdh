import { Inject, forwardRef } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BreweriesService } from './breweries.service';

@WebSocketGateway()
export class BreweriesGateway {
  // Der socket.io-Server; emit sendet an alle verbundenen Clients
  @WebSocketServer()
  server: Server;

  // Der Service injiziert das Gateway: forwardRef auf beiden Seiten
  constructor(
    @Inject(forwardRef(() => BreweriesService))
    private readonly breweriesService: BreweriesService,
  ) {}

  // Event vom Client; der Rückgabewert geht als Antwort zurück
  @SubscribeMessage('breweries')
  findAll() {
    return this.breweriesService.findAll({ order: 'asc' });
  }
}

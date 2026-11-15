import { Injectable, NotImplementedException } from '@nestjs/common';
import { BeersService } from '../beers/beers.service';
import { ErpClient } from '../erp/erp.client';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './dto/order.dto';

@Injectable()
export class OrdersService {
  // Daten im Arbeitsspeicher: Nach dem Start gibt es keine Bestellung
  private readonly orders: Order[] = [];
  private nextId = 1;

  constructor(
    private readonly erpClient: ErpClient,
    private readonly beersService: BeersService,
  ) {}

  findAll(): Order[] {
    return this.orders;
  }

  // Regel: Eine Bestellung braucht ein Bier im Katalog und genug Bestand im
  // ERP (Summe aller Lagerorte). Die Bestellung bucht im ERP nichts ab
  //
  // TODO Aufgabe 19.4:
  // 1. src/erp/erp.schemas.ts: Schema des Bestands
  // 2. src/erp/erp.client.ts: findStock(articleNumber)
  // 3. hier: das Bier mit beersService.findOne() suchen (404), den Bestand
  //    zu seiner erpNumber lesen und über alle Lagerorte summieren; reicht
  //    er nicht für dto.bottles: ConflictException (409); sonst die
  //    Bestellung mit neuer id speichern und zurückgeben. Danach wird die
  //    Methode async
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- dto braucht erst Aufgabe 19.4
  create(dto: CreateOrderDto): Promise<Order> {
    throw new NotImplementedException(
      'POST /orders is not implemented yet: see TODO in src/orders/orders.service.ts',
    );
  }
}

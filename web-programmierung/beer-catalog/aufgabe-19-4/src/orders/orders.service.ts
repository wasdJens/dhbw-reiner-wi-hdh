import { ConflictException, Injectable } from '@nestjs/common';
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
  async create(dto: CreateOrderDto): Promise<Order> {
    const beer = this.beersService.findOne(dto.beerId);
    const stock = await this.erpClient.findStock(beer.erpNumber);
    const bottles = stock.lagerorte.reduce((sum, l) => sum + l.bestand, 0);
    if (bottles < dto.bottles) {
      throw new ConflictException(
        `Not enough stock for beer ${beer.id}: ${bottles} bottles available`,
      );
    }
    const order = { id: this.nextId++, ...dto };
    this.orders.push(order);
    return order;
  }
}

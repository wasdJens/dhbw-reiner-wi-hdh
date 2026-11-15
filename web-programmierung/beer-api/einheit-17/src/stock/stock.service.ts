import { Injectable, NotFoundException } from '@nestjs/common';
import { BeersService } from '../beers/beers.service';
import { StockDto } from './dto/stock.dto';
import { ErpClient } from './erp.client';
import { toStock } from './stock.mapper';

@Injectable()
export class StockService {
  constructor(
    private readonly beersService: BeersService,
    private readonly erpClient: ErpClient,
  ) {}

  // Normal: Bier 1 mit BR-1001 → Bestand aus dem ERP
  // Fehler: Bier 42 → 404 aus BeersService, das ERP wird nicht gefragt
  // Fehler: Bier ohne Artikelnummer → 404, das ERP wird nicht gefragt
  // Fehler: ERP kennt die Artikelnummer nicht → 404
  // Ausfall: ERP fehlt oder ist zu langsam → 503, ungültige Antwort → 502
  async findOne(beerId: number): Promise<StockDto> {
    const beer = await this.beersService.findOne(beerId);
    if (!beer.articleNumber) {
      throw new NotFoundException(`Beer ${beerId} has no article number`);
    }
    const erpStock = await this.erpClient.findStock(beer.articleNumber);
    if (!erpStock) {
      throw new NotFoundException(`No stock for beer ${beerId}`);
    }
    return toStock(beerId, erpStock);
  }
}

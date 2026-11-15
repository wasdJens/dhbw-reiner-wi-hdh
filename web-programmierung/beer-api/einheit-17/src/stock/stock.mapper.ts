import { StockDto } from './dto/stock.dto';
import { ErpStock } from './erp.schemas';

// ERP v2 → Beer API: deutsche Felder und Lagerorte des ERP bleiben hier
export function toStock(beerId: number, erpStock: ErpStock): StockDto {
  return {
    beerId,
    // Summe aller Lagerorte, wie bisher bestand in v1
    bottles: erpStock.lagerorte.reduce((sum, s) => sum + s.bestand, 0),
    // 2026-11-15T13:03:00Z → 2026-11-15
    asOf: erpStock.aktualisiert_am.slice(0, 10),
  };
}

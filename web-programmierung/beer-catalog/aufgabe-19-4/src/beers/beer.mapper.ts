import { ErpArticle } from '../erp/erp.schemas';
import { Beer } from './dto/beer.dto';

// ERP → Katalog: Artikel und Brauerei des Katalogs ergeben ein Bier ohne id
export function toBeer(
  erpArticle: ErpArticle,
  breweryId: number,
): Omit<Beer, 'id'> {
  return {
    erpNumber: erpArticle.artikel_nr,
    name: erpArticle.bezeichnung,
    style: erpArticle.sorte,
    abv: erpArticle.alkohol_vol,
    // 139 Cent → 1,39 Euro
    price: erpArticle.preis_cent / 100,
    breweryId,
  };
}

import { ErpBrewery } from '../erp/erp.schemas';
import { Brewery } from './dto/brewery.dto';

// ERP → Katalog: deutsche Felder des ERP bleiben hier. Die id fehlt, denn
// sie vergibt der Katalog
export function toBrewery(erpBrewery: ErpBrewery): Omit<Brewery, 'id'> {
  return {
    erpNumber: erpBrewery.brauerei_nr,
    name: erpBrewery.name,
    city: erpBrewery.ort,
  };
}

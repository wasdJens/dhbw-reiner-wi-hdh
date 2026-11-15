import {
  BadGatewayException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';
import { ErpBrewery, ErpBrewerySchema, erpPageSchema } from './erp.schemas';

// Die einzige Klasse, die das ERP aufruft: Adresse, API-Key, Pfade und Fehler
@Injectable()
export class ErpClient {
  private readonly url: string;
  private readonly apiKey: string;

  // Ohne ERP_URL oder ERP_API_KEY in .env startet der Katalog nicht
  constructor(config: ConfigService) {
    this.url = config.getOrThrow<string>('ERP_URL');
    this.apiKey = config.getOrThrow<string>('ERP_API_KEY');
  }

  // Alle Brauereien: Das ERP liefert sie seitenweise, seiten_gesamt nennt
  // die Zahl der Seiten
  async findBreweries(): Promise<ErpBrewery[]> {
    const breweries: ErpBrewery[] = [];
    let pages = 1;
    for (let page = 1; page <= pages; page++) {
      const result = await this.request(
        `/v2/brauereien?seite=${page}`,
        erpPageSchema(ErpBrewerySchema),
      );
      breweries.push(...result.daten);
      pages = result.seiten_gesamt;
    }
    return breweries;
  }

  // TODO Aufgabe 19.3: findArticles() liest alle Artikel aus GET /v2/artikel,
  // Seite für Seite wie findBreweries(), und prüft jede Seite gegen das Schema
  // des Artikels aus erp.schemas.ts

  // TODO Aufgabe 19.4: findStock(articleNumber) liest den Bestand eines
  // Artikels aus GET /v2/artikel/{artikel_nr}/bestand über request() und
  // prüft ihn gegen das Schema des Bestands aus erp.schemas.ts

  // Jede Anfrage an das ERP: API-Key, Timeout und Prüfung der Antwort
  private async request<T extends z.ZodType>(
    path: string,
    schema: T,
  ): Promise<z.infer<T>> {
    const response = await fetch(`${this.url}${path}`, {
      headers: { 'X-API-Key': this.apiKey },
      // Ohne Timeout wartet die Anfrage unbegrenzt auf das ERP
      signal: AbortSignal.timeout(2000),
    }).catch(() => {
      // ERP läuft nicht oder antwortet nicht innerhalb von 2 s
      throw new ServiceUnavailableException('ERP unavailable');
    });

    // Antwort wie ein Body prüfen; Fehlertexte des ERP bleiben hier
    const result = schema.safeParse(await response.json().catch(() => null));
    if (!response.ok || !result.success) {
      throw new BadGatewayException('Invalid response from ERP');
    }
    return result.data;
  }
}

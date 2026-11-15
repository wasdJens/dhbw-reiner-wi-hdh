import {
  BadGatewayException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErpStock, ErpStockSchema } from './erp.schemas';

// Die einzige Klasse, die das ERP kennt: Adresse, Pfad, API-Key und Fehler
@Injectable()
export class ErpClient {
  private readonly logger = new Logger(ErpClient.name);
  private readonly url: string;
  private readonly apiKey: string;

  // Ohne ERP_URL oder ERP_API_KEY in .env startet der Server nicht
  constructor(config: ConfigService) {
    this.url = config.getOrThrow<string>('ERP_URL');
    this.apiKey = config.getOrThrow<string>('ERP_API_KEY');
  }

  // null: Das ERP kennt den Artikel nicht (404)
  async findStock(articleNumber: string): Promise<ErpStock | null> {
    const response = await fetch(
      `${this.url}/v2/artikel/${encodeURIComponent(articleNumber)}/bestand`,
      {
        headers: { 'X-API-Key': this.apiKey },
        // Ohne Timeout wartet die Anfrage unbegrenzt auf das ERP
        signal: AbortSignal.timeout(2000),
      },
    ).catch(() => {
      // ERP läuft nicht oder antwortet nicht innerhalb von 2 s
      throw new ServiceUnavailableException('Stock service unavailable');
    });

    // Das ERP kündigt den Endpunkt ab (Header Deprecation, RFC 9745)
    if (response.headers.has('Deprecation')) {
      this.logger.warn(
        `ERP-Endpunkt ${new URL(response.url).pathname} ist abgekündigt, Sunset: ${response.headers.get('Sunset')}`,
      );
    }
    if (response.status === 404) {
      return null;
    }

    // Antwort wie ein Body prüfen; Fehlertexte des ERP bleiben hier
    const result = ErpStockSchema.safeParse(
      await response.json().catch(() => null),
    );
    if (!response.ok || !result.success) {
      throw new BadGatewayException('Invalid response from stock service');
    }
    return result.data;
  }
}

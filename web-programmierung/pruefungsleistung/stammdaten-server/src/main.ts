import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from './app.module';
import { API_KEY_SCHEME } from './auth/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API-Dokumentation: Swagger UI unter /api, OpenAPI als JSON unter /api-json
  const config = new DocumentBuilder()
    .setTitle('Stammdaten-Server · Prismarine Solutions GmbH')
    .setDescription(
      'Stammdaten der Prismarine Solutions GmbH: Personen, Abteilungen, Standorte, Räume, ' +
        'Inventar, Artikel und Feiertage. Alle Daten sind fiktiv. Jede Anfrage braucht den ' +
        'Header X-API-Key. Listen liefern bis zu 500 Einträge je Seite (pro_seite). ' +
        'Das Handbuch steht im README des Projekts.',
    )
    .addServer('http://localhost:3300')
    // Button Authorize: Swagger UI sendet den Key im Header X-API-Key
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API-Key des Stammdaten-Servers',
      },
      API_KEY_SCHEME,
    )
    // Der Key gilt für alle Endpunkte
    .addSecurityRequirements(API_KEY_SCHEME)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, cleanupOpenApiDoc(document));

  await app.listen(process.env.PORT ?? 3300);
}
void bootstrap();

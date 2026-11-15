import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from './app.module';
import { API_KEY_SCHEME } from './auth/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API-Dokumentation: Swagger UI unter /api, OpenAPI als JSON unter /api-json
  const config = new DocumentBuilder()
    .setTitle('Brauerei-ERP')
    .setDescription(
      'Lagerbestand und Stammdaten (Brauereien, Artikel) der regionalen Brauereien. ' +
        'Jede Anfrage braucht den Header X-API-Key. Listen liefern höchstens 3 Einträge je Seite. ' +
        'v1 ist abgekündigt und wird am 01.01.2028 abgeschaltet; neue Clients nutzen v2.',
    )
    .addServer('http://localhost:3100')
    // Button Authorize: Swagger UI sendet den Key im Header X-API-Key
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API-Key der Brauerei',
      },
      API_KEY_SCHEME,
    )
    // Der Key gilt für alle Endpunkte
    .addSecurityRequirements(API_KEY_SCHEME)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, cleanupOpenApiDoc(document));

  await app.listen(process.env.PORT ?? 3100);
}
void bootstrap();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API-Dokumentation: Swagger UI unter /api, OpenAPI als JSON unter /api-json
  const config = new DocumentBuilder()
    .setTitle('Beer Catalog')
    .setDescription(
      'Katalog der regionalen Brauereien: Brauereien und Biere aus dem Brauerei-ERP, Bestellungen nur bei Bestand.',
    )
    .addServer('http://localhost:3000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, cleanupOpenApiDoc(document));

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

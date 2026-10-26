import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Dateien aus public/: /dashboard liefert public/dashboard.html
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    extensions: ['html'],
  });
  // Templates aus views/, Engine Handlebars (hbs)
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // API-Dokumentation: Swagger UI unter /api, OpenAPI als JSON unter /api-json
  const config = new DocumentBuilder()
    .setTitle('Beer API')
    // Adresse des Servers: Der Import in Postman setzt daraus baseUrl
    .addServer('http://localhost:3000')
    // Button Authorize: Swagger UI sendet das Token als Bearer
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, cleanupOpenApiDoc(document));

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

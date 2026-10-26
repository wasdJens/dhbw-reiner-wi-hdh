import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

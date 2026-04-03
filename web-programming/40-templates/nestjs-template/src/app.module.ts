import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      // Database Type
      type: 'better-sqlite3',
      // Database file path - Will generate a `nestjs-database.db` in the root folder
      database: 'nestjs-database.db',
      // Auto generates database schemas on startup. Should not be used in production
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

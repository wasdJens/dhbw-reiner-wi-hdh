import { Module } from '@nestjs/common';
import { BeersModule } from './modules/beers/beers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BeersModule,
    /**
     * Database Setup for typeorm
     */
    TypeOrmModule.forRoot({
      // Database Type
      type: 'better-sqlite3',
      // Database file path - Will generate a `beer-api.db` in the root folder
      database: 'beer-api.db',
      // Auto generates database schemas on startup. Should not be used in production
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

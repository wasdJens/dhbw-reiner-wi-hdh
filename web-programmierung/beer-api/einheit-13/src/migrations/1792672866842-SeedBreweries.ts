import { MigrationInterface, QueryRunner } from 'typeorm';
import { Brewery } from '../breweries/brewery.entity';

// Beispieldaten aus anforderungen.md; die id sind fest
export class SeedBreweries1792672866842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Brewery, [
      {
        id: 1,
        name: 'Privatbrauerei Schlumberger',
        city: 'Nattheim',
        country: 'Deutschland',
      },
      {
        id: 2,
        name: 'Wildbräu Grafing',
        city: 'Grafing bei München',
        country: 'Deutschland',
      },
      {
        id: 3,
        name: 'Augustiner-Bräu',
        city: 'München',
        country: 'Deutschland',
      },
      {
        id: 4,
        name: 'Edelweissbrauerei Farny',
        city: 'Kißlegg',
        country: 'Deutschland',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Brewery, [1, 2, 3, 4]);
  }
}

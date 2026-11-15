import { MigrationInterface, QueryRunner } from 'typeorm';
import { Beer } from '../beers/beer.entity';

// Beispieldaten aus anforderungen.md; die Brauereien 1 bis 4 gibt es schon
export class SeedBeers1792673141254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Beer, [
      {
        id: 1,
        name: 'Nattheimer Spezial',
        style: 'spezial',
        abv: 5.4,
        breweryId: 1,
      },
      {
        id: 2,
        name: 'Wildbräu Grafing Helles',
        style: 'helles',
        abv: 5.0,
        breweryId: 2,
      },
      {
        id: 3,
        name: 'Augustiner Lagerbier Hell',
        style: 'helles',
        abv: 5.2,
        breweryId: 3,
      },
      {
        id: 4,
        name: 'Farny Kristall-Weizen',
        style: 'weizen',
        abv: 5.3,
        breweryId: 4,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Beer, [1, 2, 3, 4]);
  }
}

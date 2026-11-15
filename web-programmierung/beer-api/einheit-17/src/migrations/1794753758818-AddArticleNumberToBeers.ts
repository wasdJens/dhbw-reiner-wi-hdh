import { MigrationInterface, QueryRunner } from 'typeorm';
import { Beer } from '../beers/beer.entity';

// Erzeugt mit migration:generate: SQLite baut die Tabelle für die neue Spalte
// neu auf. Von Hand ergänzt: die Artikelnummern der Beispieldaten
export class AddArticleNumberToBeers1794753758818 implements MigrationInterface {
  name = 'AddArticleNumberToBeers1794753758818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_beer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "style" varchar NOT NULL, "abv" real NOT NULL, "breweryId" integer NOT NULL, "description" varchar, "articleNumber" varchar, CONSTRAINT "FK_90153fe87d3eee841f699ef5fa7" FOREIGN KEY ("breweryId") REFERENCES "brewery" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_beer"("id", "name", "style", "abv", "breweryId", "description") SELECT "id", "name", "style", "abv", "breweryId", "description" FROM "beer"`,
    );
    await queryRunner.query(`DROP TABLE "beer"`);
    await queryRunner.query(`ALTER TABLE "temporary_beer" RENAME TO "beer"`);
    // Artikelnummern im Brauerei-ERP für die vier Biere aus SeedBeers
    await queryRunner.manager.update(Beer, 1, { articleNumber: 'BR-1001' });
    await queryRunner.manager.update(Beer, 2, { articleNumber: 'BR-1002' });
    await queryRunner.manager.update(Beer, 3, { articleNumber: 'BR-1003' });
    await queryRunner.manager.update(Beer, 4, { articleNumber: 'BR-1004' });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "beer" RENAME TO "temporary_beer"`);
    await queryRunner.query(
      `CREATE TABLE "beer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "style" varchar NOT NULL, "abv" real NOT NULL, "breweryId" integer NOT NULL, "description" varchar, CONSTRAINT "FK_90153fe87d3eee841f699ef5fa7" FOREIGN KEY ("breweryId") REFERENCES "brewery" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "beer"("id", "name", "style", "abv", "breweryId", "description") SELECT "id", "name", "style", "abv", "breweryId", "description" FROM "temporary_beer"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_beer"`);
  }
}

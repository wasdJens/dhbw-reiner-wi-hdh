import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBeersAndRatings1792673139806 implements MigrationInterface {
  name = 'CreateBeersAndRatings1792673139806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "beer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "style" varchar NOT NULL, "abv" real NOT NULL, "breweryId" integer NOT NULL, "description" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "rating" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "beerId" integer NOT NULL, "userId" integer NOT NULL, "score" integer NOT NULL, "comment" varchar, "createdAt" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_beer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "style" varchar NOT NULL, "abv" real NOT NULL, "breweryId" integer NOT NULL, "description" varchar, CONSTRAINT "FK_90153fe87d3eee841f699ef5fa7" FOREIGN KEY ("breweryId") REFERENCES "brewery" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_beer"("id", "name", "style", "abv", "breweryId", "description") SELECT "id", "name", "style", "abv", "breweryId", "description" FROM "beer"`,
    );
    await queryRunner.query(`DROP TABLE "beer"`);
    await queryRunner.query(`ALTER TABLE "temporary_beer" RENAME TO "beer"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_rating" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "beerId" integer NOT NULL, "userId" integer NOT NULL, "score" integer NOT NULL, "comment" varchar, "createdAt" varchar NOT NULL, CONSTRAINT "FK_10a400fb4723f19cc25dd847558" FOREIGN KEY ("beerId") REFERENCES "beer" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_rating"("id", "beerId", "userId", "score", "comment", "createdAt") SELECT "id", "beerId", "userId", "score", "comment", "createdAt" FROM "rating"`,
    );
    await queryRunner.query(`DROP TABLE "rating"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_rating" RENAME TO "rating"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rating" RENAME TO "temporary_rating"`,
    );
    await queryRunner.query(
      `CREATE TABLE "rating" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "beerId" integer NOT NULL, "userId" integer NOT NULL, "score" integer NOT NULL, "comment" varchar, "createdAt" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "rating"("id", "beerId", "userId", "score", "comment", "createdAt") SELECT "id", "beerId", "userId", "score", "comment", "createdAt" FROM "temporary_rating"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_rating"`);
    await queryRunner.query(`ALTER TABLE "beer" RENAME TO "temporary_beer"`);
    await queryRunner.query(
      `CREATE TABLE "beer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "style" varchar NOT NULL, "abv" real NOT NULL, "breweryId" integer NOT NULL, "description" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "beer"("id", "name", "style", "abv", "breweryId", "description") SELECT "id", "name", "style", "abv", "breweryId", "description" FROM "temporary_beer"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_beer"`);
    await queryRunner.query(`DROP TABLE "rating"`);
    await queryRunner.query(`DROP TABLE "beer"`);
  }
}

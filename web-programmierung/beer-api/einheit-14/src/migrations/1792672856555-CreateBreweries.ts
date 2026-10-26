import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBreweries1792672856555 implements MigrationInterface {
  name = 'CreateBreweries1792672856555';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brewery" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "city" varchar NOT NULL, "country" varchar NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "brewery"`);
  }
}

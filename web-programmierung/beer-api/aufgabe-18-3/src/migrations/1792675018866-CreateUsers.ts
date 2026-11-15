import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1792675018866 implements MigrationInterface {
  name = 'CreateUsers1792675018866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "passwordHash" varchar NOT NULL, CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, PRIMARY KEY ("userId", "roleId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_user_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "roleId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user_role"("userId", "roleId") SELECT "userId", "roleId" FROM "user_role"`,
    );
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_user_role" RENAME TO "user_role"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_role" RENAME TO "temporary_user_role"`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, PRIMARY KEY ("userId", "roleId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role"("userId", "roleId") SELECT "userId", "roleId" FROM "temporary_user_role"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user_role"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}

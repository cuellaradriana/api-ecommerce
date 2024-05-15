import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUserAdmin1715261368080 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE users SET "isAdmin" = true WHERE "id" = ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE users SET "isAdmin" = false WHERE "id" = ''`,
    );
  }
}

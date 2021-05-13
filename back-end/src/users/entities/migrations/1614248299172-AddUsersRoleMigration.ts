import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsersRoleMigration1614248299172 implements MigrationInterface {
    name = 'AddUsersRoleMigration1614248299172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}

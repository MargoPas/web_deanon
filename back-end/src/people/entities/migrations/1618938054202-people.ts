import {MigrationInterface, QueryRunner} from "typeorm";

export class people1618938054202 implements MigrationInterface {
    name = 'people1618938054202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" ADD "user_id" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "user_id"`);
    }

}

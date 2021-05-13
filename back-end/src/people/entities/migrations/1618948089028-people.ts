import {MigrationInterface, QueryRunner} from "typeorm";

export class people1618948089028 implements MigrationInterface {
    name = 'people1618948089028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" ADD "photo" character varying`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "photo"`);
    }

}

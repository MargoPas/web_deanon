import {MigrationInterface, QueryRunner} from "typeorm";

export class people1618404929197 implements MigrationInterface {
    name = 'people1618404929197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "photo"`);
        await queryRunner.query(`ALTER TABLE "people" ALTER COLUMN "middle__name" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "people"."middle__name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."role" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "users"."role" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "people"."middle__name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "people" ALTER COLUMN "middle__name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "people" ADD "photo" character varying NOT NULL`);
    }

}

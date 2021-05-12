import {MigrationInterface, QueryRunner} from "typeorm";

export class everything1620735280238 implements MigrationInterface {
    name = 'everything1620735280238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "PK_user_id"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "people_id"`);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "user_id"`);
        await queryRunner.query(`COMMENT ON COLUMN "votes"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "people" ALTER COLUMN "photo" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "people"."photo" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "people"."photo" IS NULL`);
        await queryRunner.query(`ALTER TABLE "people" ALTER COLUMN "photo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff"`);
        await queryRunner.query(`COMMENT ON COLUMN "votes"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "people" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "people_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "PK_user_id" PRIMARY KEY ("user_id")`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class everything1619610331238 implements MigrationInterface {
    name = 'everything1619610331238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "PK_user_id"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "people_id"`);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "user_id_id" integer`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "UQ_5ccccdcec1368b126738c947569" UNIQUE ("user_id_id")`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "people_id_id" integer`);
        await queryRunner.query(`ALTER TABLE "people" ADD "user_id_id" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "votes"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id")`);
        await queryRunner.query(`COMMENT ON COLUMN "people"."photo" IS NULL`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_5ccccdcec1368b126738c947569" FOREIGN KEY ("user_id_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_29b7514674d861a2ad9edc9e1f1" FOREIGN KEY ("people_id_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_89b30eed078673aaca8f1576c58" FOREIGN KEY ("user_id_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "FK_89b30eed078673aaca8f1576c58"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_29b7514674d861a2ad9edc9e1f1"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_5ccccdcec1368b126738c947569"`);
        await queryRunner.query(`COMMENT ON COLUMN "people"."photo" IS NULL`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff"`);
        await queryRunner.query(`COMMENT ON COLUMN "votes"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "user_id_id"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "people_id_id"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "UQ_5ccccdcec1368b126738c947569"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "user_id_id"`);
        await queryRunner.query(`ALTER TABLE "people" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "people_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "PK_27be2cab62274f6876ad6a31641" PRIMARY KEY ("user_id")`);
    }

}

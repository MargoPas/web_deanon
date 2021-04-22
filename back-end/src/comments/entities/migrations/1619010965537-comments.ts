import {MigrationInterface, QueryRunner} from "typeorm";

export class comments1619010965537 implements MigrationInterface {
    name = 'comments1619010965537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("user_id" SERIAL NOT NULL, "people_id" character varying NOT NULL, "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4c675567d2a58f0b07cef09c13d" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}

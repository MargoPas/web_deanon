import {MigrationInterface, QueryRunner} from "typeorm";

export class vote1618937442892 implements MigrationInterface {
    name = 'vote1618937442892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "votes" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "people_id" integer NOT NULL, "stars" integer NOT NULL, CONSTRAINT "UQ_27be2cab62274f6876ad6a31641" UNIQUE ("user_id"), CONSTRAINT "PK_user_id" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "votes"`);
    }

}

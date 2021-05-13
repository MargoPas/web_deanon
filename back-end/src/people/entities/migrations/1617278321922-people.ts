import {MigrationInterface, QueryRunner} from "typeorm";

export class people1617278321922 implements MigrationInterface {
    name = 'people1617278321922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "people" ("id" SERIAL NOT NULL, "last__name" character varying NOT NULL, "first__name" character varying NOT NULL, "middle__name" character varying, "description" character varying NOT NULL, "photo" character varying NOT NULL, CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`DROP TABLE "people"`);
    }

}

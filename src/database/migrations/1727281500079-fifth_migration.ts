import { MigrationInterface, QueryRunner } from "typeorm";

export class FifthMigration1727281500079 implements MigrationInterface {
    name = 'FifthMigration1727281500079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`image\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`url\``);
    }

}

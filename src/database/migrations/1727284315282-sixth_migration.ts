import { MigrationInterface, QueryRunner } from "typeorm";

export class SixthMigration1727284315282 implements MigrationInterface {
    name = 'SixthMigration1727284315282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`title\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`title\` varchar(30) NULL`);
    }

}

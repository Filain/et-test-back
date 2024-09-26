import { MigrationInterface, QueryRunner } from "typeorm";

export class SeventhMigration1727284795982 implements MigrationInterface {
    name = 'SeventhMigration1727284795982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`date\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`date\` date NULL`);
    }

}

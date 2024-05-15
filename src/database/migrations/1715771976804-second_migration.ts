import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1715771976804 implements MigrationInterface {
    name = 'SecondMigration1715771976804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_063308359b6a00ed4bba1acfd0\` ON \`event\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`where_here\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`title\` varchar(30) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`organizer\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`date\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(30) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`where_here\` \`where_here\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`date_birth\` \`date_birth\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`date_birth\` \`date_birth\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`where_here\` \`where_here\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`organizer\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`where_here\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`name\` varchar(30) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_063308359b6a00ed4bba1acfd0\` ON \`event\` (\`email\`)`);
    }

}

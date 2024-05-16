import { MigrationInterface, QueryRunner } from "typeorm";

export class FourthMigration1715800594672 implements MigrationInterface {
    name = 'FourthMigration1715800594672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`where_here\` \`where_hear\` varchar(20) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`where_hear\` \`where_here\` varchar(20) NULL`);
    }

}

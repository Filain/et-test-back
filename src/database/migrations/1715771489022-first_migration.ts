import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1715771489022 implements MigrationInterface {
    name = 'FirstMigration1715771489022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(30) NOT NULL, \`email\` varchar(255) NOT NULL, \`where_here\` varchar(20) NOT NULL, UNIQUE INDEX \`IDX_063308359b6a00ed4bba1acfd0\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(30) NOT NULL, \`email\` varchar(255) NOT NULL, \`where_here\` varchar(20) NOT NULL, \`date_birth\` date NOT NULL, \`event_id\` int NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_4245a6b002b13f12e426d9db3ff\` FOREIGN KEY (\`event_id\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_4245a6b002b13f12e426d9db3ff\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_063308359b6a00ed4bba1acfd0\` ON \`event\``);
        await queryRunner.query(`DROP TABLE \`event\``);
    }

}

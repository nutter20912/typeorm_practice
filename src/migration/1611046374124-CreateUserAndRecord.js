const {
  MigrationInterface,
  QueryRunner
} = require("typeorm");

module.exports = class CreateUserAndRecord1611046374124 {
  name = 'CreateUserAndRecord1611046374124'

  async up(queryRunner) {
    await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `version` int NOT NULL, `name` varchar(100) NOT NULL COMMENT '名稱', `cash` decimal(10,2) NOT NULL COMMENT '額度', `createdat` datetime(6) NOT NULL COMMENT '建立時間' DEFAULT CURRENT_TIMESTAMP(6), `updatedat` datetime(6) NOT NULL COMMENT '更新時間' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    await queryRunner.query("CREATE TABLE `record` (`id` int NOT NULL AUTO_INCREMENT, `operator` varchar(100) NOT NULL COMMENT '操作者', `diff` decimal(10,2) NOT NULL COMMENT '異動額度', `current` decimal(10,2) NOT NULL COMMENT '異動後額度', `created_at` datetime(6) NOT NULL COMMENT '建立時間' DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    await queryRunner.query("ALTER TABLE `record` ADD CONSTRAINT `FK_8675cd3761984947c2506f39a25` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
  }

  async down(queryRunner) {
    await queryRunner.query("ALTER TABLE `record` DROP FOREIGN KEY `FK_8675cd3761984947c2506f39a25`");
    await queryRunner.query("DROP TABLE `record`");
    await queryRunner.query("DROP INDEX `IDX_065d4d8f3b5adb4a08841eae3c` ON `user`");
    await queryRunner.query("DROP TABLE `user`");
  }
}
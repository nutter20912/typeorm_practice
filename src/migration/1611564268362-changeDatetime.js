const {
  MigrationInterface,
  QueryRunner
} = require("typeorm");

module.exports = class ChangeUserDate1611564268362 {
  name = 'changeUserDate1611564268362'

  async up(queryRunner) {
    await queryRunner.query("ALTER TABLE `user` CHANGE `createdat` `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間'");
    await queryRunner.query("ALTER TABLE `user` CHANGE `updatedat` `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新時間'");
    await queryRunner.query("ALTER TABLE `record` CHANGE `created_at` `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間'");
  }

  async down(queryRunner) {
    await queryRunner.query("ALTER TABLE `user` CHANGE `created_at` `createdat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間';");
    await queryRunner.query("ALTER TABLE `user` CHANGE `updated_at` `updatedat` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間';");
    await queryRunner.query("ALTER TABLE `record` CHANGE `created_at` `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間';");
  }
}
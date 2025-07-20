CREATE TABLE `tokens` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `provider` VARCHAR(100) NOT NULL COMMENT '渠道商',
  `chain` VARCHAR(100) NOT NULL COMMENT '链',
  `code` VARCHAR(100) DEFAULT NULL COMMENT 'code',
  `name` VARCHAR(100) NOT NULL COMMENT 'name',
  `address` VARCHAR(100) NOT NULL COMMENT 'Address',
  `symbol` VARCHAR(100) NOT NULL COMMENT 'Symbol',
  `decimals` INT NOT NULL COMMENT 'decimals',
  `created_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
  UNIQUE KEY `unique_provider_chain_name_symbol` (`chain`,`provider`,`name`,`symbol`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='报价Token信息表';
``

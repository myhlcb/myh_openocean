CREATE TABLE `provider_chains` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `chain_name` VARCHAR(50) NULL COMMENT 'EVM Chains',
  `chain_code` VARCHAR(50) NOT NULL COMMENT 'Chain Code',
  `chain_id` INT NOT NULL COMMENT 'uid',
  `provider` VARCHAR(50) NOT NULL COMMENT '供应商',
  `created_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
  UNIQUE KEY `unique_provider_chain` (`chain_name`,`provider`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

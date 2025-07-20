CREATE TABLE `quotes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `provider` VARCHAR(100) NOT NULL COMMENT '渠道商',
  `chain` VARCHAR(100) NOT NULL COMMENT '链',
  `in_token_address` VARCHAR(100) NOT NULL COMMENT 'inToken Address',
  `in_token_symbol` VARCHAR(100) NOT NULL COMMENT 'inToken Symbol',
  `out_token_address` VARCHAR(100) NOT NULL COMMENT 'outToken Address',
  `out_token_symbol` VARCHAR(100) NOT NULL COMMENT 'outToken Symbol',
  `dex` VARCHAR(100) NOT NULL COMMENT 'dex',
  `swap_amount` DECIMAL(32,16) NOT NULL COMMENT 'swapAmount',
  `created_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
  UNIQUE KEY `unique_provider_chain_in_token_symbol_out_token_symbol_dex` (`provider`,`chain`,`in_token_symbol`,`out_token_symbol`,`dex`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

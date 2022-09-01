-- @block
CREATE TABLE `stocks`(
    `id` INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `symbol` VARCHAR(255) NOT NULL,
    `data` JSON NOT NULL,
    `sentiment` INT NULL
);
ALTER TABLE
    `stocks` ADD INDEX `stocks_symbol_index`(`symbol`);
ALTER TABLE
    `stocks` ADD UNIQUE `stocks_symbol_unique`(`symbol`);
-- @block
CREATE TABLE `tweets`(
    `id` INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `symbol` VARCHAR(255) NOT NULL,
    `data` JSON NOT NULL,
    `sentiment` INT NULL
);
-- @block
ALTER TABLE
    `stocks` ADD CONSTRAINT `stocks_id_foreign` FOREIGN KEY(`id`) REFERENCES `tweets`(`id`);

-- @block
SELECT * from stocks WHERE symbol="AMZN"

-- @block
ALTER TABLE news
MODIFY sentiment INT NULL

-- @block
SHOW CREATE TABLE stocks

-- @block
ALTER TABLE 
    `stocks` DROP CONSTRAINT `stocks_id_foreign`;

-- @block
ALTER TABLE 
    `tweets` ADD `symbol` VARCHAR(255) NOT NULL;

-- @block
ALTER TABLE
    `tweets` ADD INDEX `tweets_symbol_index`(`symbol`);

-- @block
ALTER TABLE news
MODIFY unix_timestamp bigint NOT NULL;

-- @block
DESCRIBE news
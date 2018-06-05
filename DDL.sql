-- Create syntax for TABLE 'book'
-- Create syntax for TABLE 'book'

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `book_id` bigint(20) DEFAULT NULL,
  `count`  int DEFAULT NULL,
  PRIMARY KEY (`id`)
);



-- Create syntax for TABLE 'book'
-- Create syntax for TABLE 'book'

#DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `book_id` bigint(20) DEFAULT NULL,
  `count`  int DEFAULT NULL,
  PRIMARY KEY (`id`)
);

#DROP TABLE IF EXISTS `user`;
 CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) DEFAULT NULL,
  `firstname` varchar(25) DEFAULT NULL,
  `lastname` varchar(25) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `avatar` varchar(1000) DEFAULT NULL,
  `role` varchar(25) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
  );

#DROP TABLE IF EXISTS `volume`;
CREATE TABLE `volume` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) DEFAULT NULL,
  `subtitle` varchar(1000) DEFAULT NULL,
  `author` varchar(50) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `published_date` varchar(50) DEFAULT NULL,
  `description` varchar(10000) DEFAULT NULL,
  `page_count` int(11) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `average_rating` float(3,1) DEFAULT NULL,
  `image_links` varchar(9000) DEFAULT NULL,
  `language` varchar(25) DEFAULT NULL,
  `price` float(7,4) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

#DROP TABLE IF EXISTS `place_order`;
 CREATE TABLE `place_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ordered_date` varchar(25) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
)
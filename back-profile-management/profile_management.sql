CREATE DATABASE IF NOT EXISTS `profile_management`;
USE `profile_management`;
--
-- Table structure for table `type_user`
--
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `type_user`;

CREATE TABLE `type_user` (
    `id` int NOT NULL AUTO_INCREMENT,
    `type_user` varchar(45) DEFAULT NULL UNIQUE,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = latin1;
--
-- Table structure for table `user`
--

CREATE TABLE `user` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(45) DEFAULT NULL,
    `email` varchar(45) DEFAULT NULL,
    `type_user_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`type_user_id`) REFERENCES type_user(`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = latin1;
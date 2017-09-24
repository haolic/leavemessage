/*
SQLyog Enterprise - MySQL GUI v6.15
MySQL - 5.1.41 : Database - leave
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `leave`;

USE `leave`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `userid` */

DROP TABLE IF EXISTS `userid`;

CREATE TABLE `userid` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `adminName` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `pwd` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `face` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `userid` */

insert  into `userid`(`userId`,`adminName`,`pwd`,`face`) values (1,'郝力衝','123','1.jpg'),(2,'姜华宇','123','1.jpg'),(3,'李江涛','123','1.jpg'),(4,'申天要','123','1.jpg'),(5,'苏迎晨','123','1.jpg');

/*Table structure for table `visitorsbook` */

DROP TABLE IF EXISTS `visitorsbook`;

CREATE TABLE `visitorsbook` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `face` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `detail` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `adminName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userFace` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reply` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `porTime` datetime NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `visitorsbook` */

insert  into `visitorsbook`(`userId`,`name`,`face`,`detail`,`adminName`,`userFace`,`reply`,`porTime`) values (167,'李白','6.jpg','我欲乘风归去',NULL,NULL,NULL,'2017-09-24 15:10:06'),(168,'鬼谷子','36.jpg','砸到花花草草也不好.','haolichong',NULL,'换行<br>哈哈哈','2017-09-24 15:10:38'),(169,'孙悟空','38.jpg','师父------------~~~~~~~~~~~~~~','haolichong',NULL,'大家一起来换行啊','2017-09-24 15:11:39'),(173,'换行的','15.jpg','哈哈哈哈<br>啊哈哈哈哈哈哈哈<br>啊哈哈哈哈哈哈哈<br>','haolichong',NULL,'对,我也换行给你看<br>哈哈.','2017-09-24 15:22:18');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

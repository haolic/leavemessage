/*
SQLyog Enterprise - MySQL GUI v6.15
MySQL - 5.0.45-community-nt : Database - leave
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
  `userId` int(11) NOT NULL auto_increment,
  `adminName` varchar(20) collate utf8_unicode_ci NOT NULL default '',
  `pwd` varchar(50) collate utf8_unicode_ci NOT NULL default '',
  `face` varchar(50) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `userid` */

insert  into `userid`(`userId`,`adminName`,`pwd`,`face`) values (1,'haolichong','123','1.jpg'),(2,'jianghuayu','123','1.jpg'),(3,'lijiangtao','123','1.jpg'),(4,'shentanyao','123','1.jpg'),(5,'suyinchen','123','1.jpg');

/*Table structure for table `visitorsbook` */

DROP TABLE IF EXISTS `visitorsbook`;

CREATE TABLE `visitorsbook` (
  `userId` int(11) NOT NULL auto_increment,
  `name` varchar(50) collate utf8_unicode_ci NOT NULL default '',
  `face` varchar(20) collate utf8_unicode_ci NOT NULL default '',
  `detail` varchar(1000) collate utf8_unicode_ci NOT NULL default '',
  `adminName` varchar(30) collate utf8_unicode_ci default NULL,
  `userFace` varchar(20) collate utf8_unicode_ci default NULL,
  `reply` varchar(1000) collate utf8_unicode_ci default NULL,
  `porTime` datetime NOT NULL,
  PRIMARY KEY  (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `visitorsbook` */

insert  into `visitorsbook`(`userId`,`name`,`face`,`detail`,`adminName`,`userFace`,`reply`,`porTime`) values (1,'会飞的猪','1.jpg','今天我干了什么什么神','李江涛','1.jpg','不错继续努力','0000-00-00 00:00:00'),(2,'','1.jpg','',NULL,NULL,NULL,'0000-00-00 00:00:00'),(3,'','1.jpg','',NULL,NULL,NULL,'0000-00-00 00:00:00'),(4,'','1.jpg','',NULL,NULL,NULL,'0000-00-00 00:00:00'),(5,'','1.jpg','',NULL,NULL,NULL,'0000-00-00 00:00:00');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

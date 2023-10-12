-- --------------------------------------------------------
-- Host:                         aws.connect.psdb.cloud
-- Server version:               8.0.23-Vitess
-- Server OS:                    Linux
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for peas4ntdb
DROP DATABASE IF EXISTS `peas4ntdb`;
CREATE DATABASE IF NOT EXISTS `peas4ntdb` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `peas4ntdb`;

-- Dumping structure for table peas4ntdb.codes
DROP TABLE IF EXISTS `codes`;
CREATE TABLE IF NOT EXISTS `codes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `barcode` varchar(8) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table peas4ntdb.codes: ~5 rows (approximately)
INSERT INTO `codes` (`id`, `barcode`) VALUES
	(1, 'test1234'),
	(2, 'test2234'),
	(3, 'testqw12'),
	(5, '12345678'),
	(7, '12345679');

-- Dumping structure for table peas4ntdb.exported_products
DROP TABLE IF EXISTS `exported_products`;
CREATE TABLE IF NOT EXISTS `exported_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `remove_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `exported_products_product_id_index` (`product_id`),
  KEY `exported_products_exporert_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table peas4ntdb.exported_products: ~0 rows (approximately)
INSERT INTO `exported_products` (`id`, `quantity`, `product_id`, `user_id`, `remove_date`) VALUES
	(1, 5, 3, 1, '2023-10-11');

-- Dumping structure for table peas4ntdb.imported_products
DROP TABLE IF EXISTS `imported_products`;
CREATE TABLE IF NOT EXISTS `imported_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `quantity` int NOT NULL,
  `delivery_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `imported_products_product_id_index` (`product_id`),
  KEY `imported_products_importer_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table peas4ntdb.imported_products: ~4 rows (approximately)
INSERT INTO `imported_products` (`id`, `product_id`, `user_id`, `quantity`, `delivery_date`) VALUES
	(1, 1, 1, 4, '2023-10-11'),
	(2, 2, 1, 123, '2023-10-23'),
	(3, 3, 1, 12, '2023-10-11'),
	(4, 3, 1, 5, '2023-10-11');

-- Dumping structure for table peas4ntdb.products_tips
DROP TABLE IF EXISTS `products_tips`;
CREATE TABLE IF NOT EXISTS `products_tips` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table peas4ntdb.products_tips: ~4 rows (approximately)
INSERT INTO `products_tips` (`id`, `name`) VALUES
	(1, 'Electronics'),
	(2, 'Clothing'),
	(3, 'Furniture'),
	(4, 'Food');

-- Dumping structure for table peas4ntdb.storage
DROP TABLE IF EXISTS `storage`;
CREATE TABLE IF NOT EXISTS `storage` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `code_id` int NOT NULL,
  `product_tip` int NOT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `cost` decimal(8,2) NOT NULL,
  `quantity` int NOT NULL,
  `serial_num` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `storage_code_id_index` (`code_id`),
  KEY `storage_product_tip_index` (`product_tip`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table peas4ntdb.storage: ~1 rows (approximately)
INSERT INTO `storage` (`id`, `code_id`, `product_tip`, `user_id`, `name`, `cost`, `quantity`, `serial_num`) VALUES
	(3, 7, 3, 1, 'New Product ', 12.30, 12, '4124qwe');

-- Dumping structure for table peas4ntdb.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table peas4ntdb.users: ~2 rows (approximately)
INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `password`) VALUES
	(1, 'Vladislavs', 'Teclavs', 'vladislavsteclavs@gmail.com', 'qwerty'),
	(2, 'htrh', 'rtjrtj', 'rob@gmail.com', '1123qwe');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

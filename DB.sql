-- --------------------------------------------------------
-- Host:                         aws.connect.psdb.cloud
-- Server version:               8.0.23-Vitess
-- Server OS:                    Linux
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for peas4ntdb
DROP DATABASE IF EXISTS `peas4ntdb`;
CREATE DATABASE IF NOT EXISTS `peas4ntdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `peas4ntdb`;

-- Dumping structure for table peas4ntdb.codes
DROP TABLE IF EXISTS `codes`;
CREATE TABLE IF NOT EXISTS `codes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `barcode` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'kods',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='kodu table';

-- Dumping data for table peas4ntdb.codes: ~99 rows (approximately)
INSERT INTO `codes` (`id`, `barcode`) VALUES
	(1, '006584350770883'),
	(2, '096852918804485'),
	(3, '064511544783144'),
	(4, '031998970575629'),
	(5, '066460221602078'),
	(6, '036304199356868'),
	(7, '082140335051472'),
	(8, '001789080260125'),
	(9, '062524399219568'),
	(10, '007254758390835'),
	(11, '048700597368832'),
	(12, '021738714745024'),
	(13, '062591784691988'),
	(14, '047742782298235'),
	(15, '050938560488576'),
	(16, '011464458621539'),
	(17, '004506614715332'),
	(18, '088139700785408'),
	(19, '027178662854412'),
	(20, '071474214989201'),
	(21, '075835089456135'),
	(22, '064752805386439'),
	(23, '096258761637152'),
	(24, '087035395099813'),
	(25, '046400693660974'),
	(26, '070897286078796'),
	(27, '015284352484423'),
	(28, '063729907259092'),
	(29, '072796481915559'),
	(30, '072792690873883'),
	(31, '045574011696105'),
	(32, '009491988932240'),
	(33, '010737912646250'),
	(34, '025213599507895'),
	(35, '093854262674090'),
	(36, '093630517920134'),
	(37, '086589804651764'),
	(38, '052057472571783'),
	(39, '000517951976990'),
	(40, '046417345242963'),
	(41, '030532873357210'),
	(42, '013412334130529'),
	(43, '075463053654378'),
	(44, '037078268953671'),
	(45, '059002186878585'),
	(46, '083776130605279'),
	(47, '041874095464007'),
	(48, '058042088577562'),
	(49, '064588159569154'),
	(50, '048814535186452'),
	(51, '050308200298163'),
	(52, '005097399004825'),
	(53, '074562397202999'),
	(54, '057519792073889'),
	(55, '063911771833813'),
	(56, '046999486020765'),
	(57, '043262117675749'),
	(58, '075312133389815'),
	(59, '046774316995194'),
	(60, '007935187879889'),
	(61, '099352991487227'),
	(62, '072959396869836'),
	(63, '066738012960867'),
	(64, '014811877268191'),
	(65, '073845350531716'),
	(66, '024791123927376'),
	(67, '002419571115094'),
	(68, '037724486866708'),
	(69, '081363724061625'),
	(70, '093645162781369'),
	(71, '024134644795334'),
	(72, '039737738705926'),
	(73, '026284762216996'),
	(74, '012210598040568'),
	(75, '082198706625213'),
	(76, '074361742077731'),
	(77, '025212593586381'),
	(78, '002977744772078'),
	(79, '039250946174609'),
	(80, '087321499630176'),
	(81, '018854662700420'),
	(82, '032308817684937'),
	(83, '004980103396792'),
	(84, '027974067002510'),
	(85, '024930027895541'),
	(86, '040727941543541'),
	(87, '028849627104447'),
	(88, '022064313964977'),
	(89, '023772691584911'),
	(90, '052670519102988'),
	(91, '092034523833574'),
	(92, '002161064932272'),
	(93, '034701756234002'),
	(94, '067025589446560'),
	(95, '031022681604160'),
	(96, '054036642754484'),
	(97, '077115172033304'),
	(98, '023465934976437'),
	(99, '085984161855637');

-- Dumping structure for table peas4ntdb.exported_products
DROP TABLE IF EXISTS `exported_products`;
CREATE TABLE IF NOT EXISTS `exported_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `quantity` int NOT NULL COMMENT 'eksportējama produkta daudzums',
  `product_id` int NOT NULL COMMENT 'produkta id',
  `user_id` int NOT NULL COMMENT 'lietotāja id',
  `object` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'kur tiek vēsts produkts',
  `remove_date` date NOT NULL COMMENT 'exporta datums',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='exportējamo produktu table';

-- Dumping data for table peas4ntdb.exported_products: ~0 rows (approximately)

-- Dumping structure for table peas4ntdb.imported_products
DROP TABLE IF EXISTS `imported_products`;
CREATE TABLE IF NOT EXISTS `imported_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `product_id` int NOT NULL COMMENT 'produkta id',
  `user_id` int NOT NULL COMMENT 'lietotāja id',
  `quantity` int NOT NULL COMMENT 'importējamo produktu daudzums',
  `delivery_date` date NOT NULL COMMENT 'importa datums',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='importējamo produktu table';

-- Dumping data for table peas4ntdb.imported_products: ~99 rows (approximately)
INSERT INTO `imported_products` (`id`, `product_id`, `user_id`, `quantity`, `delivery_date`) VALUES
	(1, 1, 1, 0, '2023-11-09'),
	(2, 2, 2, 0, '2023-11-13'),
	(3, 3, 2, 0, '2023-11-12'),
	(4, 4, 1, 2, '2023-11-02'),
	(5, 5, 1, 1, '2023-10-19'),
	(6, 6, 2, 2, '2023-10-27'),
	(7, 7, 2, 4, '2023-11-04'),
	(8, 8, 2, 1, '2023-10-16'),
	(9, 9, 2, 0, '2023-10-19'),
	(10, 10, 2, 3, '2023-10-30'),
	(11, 11, 2, 1, '2023-11-10'),
	(12, 12, 1, 8, '2023-10-28'),
	(13, 13, 1, 12, '2023-11-01'),
	(14, 14, 1, 11, '2023-11-08'),
	(15, 15, 2, 2, '2023-10-25'),
	(16, 16, 1, 13, '2023-11-08'),
	(17, 17, 1, 14, '2023-11-08'),
	(18, 18, 2, 8, '2023-10-31'),
	(19, 19, 1, 3, '2023-11-10'),
	(20, 20, 2, 12, '2023-11-03'),
	(21, 21, 1, 6, '2023-11-08'),
	(22, 22, 1, 9, '2023-11-01'),
	(23, 23, 2, 7, '2023-11-05'),
	(24, 24, 2, 9, '2023-11-09'),
	(25, 25, 1, 20, '2023-11-12'),
	(26, 26, 1, 1, '2023-11-05'),
	(27, 27, 1, 26, '2023-11-01'),
	(28, 28, 1, 14, '2023-10-28'),
	(29, 29, 2, 26, '2023-11-04'),
	(30, 30, 2, 29, '2023-10-17'),
	(31, 31, 1, 27, '2023-10-18'),
	(32, 32, 2, 18, '2023-11-10'),
	(33, 33, 2, 30, '2023-10-29'),
	(34, 34, 2, 17, '2023-11-09'),
	(35, 35, 2, 2, '2023-10-18'),
	(36, 36, 1, 26, '2023-10-28'),
	(37, 37, 2, 22, '2023-10-17'),
	(38, 38, 2, 15, '2023-10-28'),
	(39, 39, 2, 22, '2023-11-12'),
	(40, 40, 1, 7, '2023-11-11'),
	(41, 41, 1, 20, '2023-10-26'),
	(42, 42, 1, 29, '2023-10-26'),
	(43, 43, 2, 38, '2023-10-17'),
	(44, 44, 2, 6, '2023-11-04'),
	(45, 45, 1, 42, '2023-11-06'),
	(46, 46, 2, 14, '2023-11-09'),
	(47, 47, 1, 43, '2023-11-05'),
	(48, 48, 2, 8, '2023-10-22'),
	(49, 49, 2, 41, '2023-10-17'),
	(50, 50, 2, 2, '2023-11-04'),
	(51, 51, 1, 24, '2023-10-29'),
	(52, 52, 2, 7, '2023-11-12'),
	(53, 53, 1, 45, '2023-10-23'),
	(54, 54, 2, 13, '2023-11-06'),
	(55, 55, 1, 1, '2023-11-12'),
	(56, 56, 2, 28, '2023-10-31'),
	(57, 57, 1, 24, '2023-10-30'),
	(58, 58, 1, 43, '2023-11-13'),
	(59, 59, 2, 23, '2023-10-15'),
	(60, 60, 2, 57, '2023-10-27'),
	(61, 61, 1, 1, '2023-10-24'),
	(62, 62, 2, 38, '2023-11-01'),
	(63, 63, 1, 38, '2023-11-09'),
	(64, 64, 1, 16, '2023-10-22'),
	(65, 65, 1, 23, '2023-11-01'),
	(66, 66, 2, 21, '2023-10-20'),
	(67, 67, 2, 2, '2023-10-28'),
	(68, 68, 1, 24, '2023-10-26'),
	(69, 69, 2, 68, '2023-10-29'),
	(70, 70, 1, 47, '2023-10-19'),
	(71, 71, 2, 57, '2023-10-18'),
	(72, 72, 1, 47, '2023-11-04'),
	(73, 73, 1, 0, '2023-11-08'),
	(74, 74, 2, 40, '2023-11-06'),
	(75, 75, 1, 28, '2023-10-30'),
	(76, 76, 1, 43, '2023-11-02'),
	(77, 77, 1, 76, '2023-11-09'),
	(78, 78, 1, 43, '2023-10-19'),
	(79, 79, 1, 5, '2023-10-16'),
	(80, 80, 2, 59, '2023-11-07'),
	(81, 81, 2, 31, '2023-11-04'),
	(82, 82, 1, 35, '2023-10-23'),
	(83, 83, 1, 28, '2023-11-02'),
	(84, 84, 1, 47, '2023-10-31'),
	(85, 85, 1, 74, '2023-10-15'),
	(86, 86, 2, 50, '2023-10-25'),
	(87, 87, 2, 72, '2023-10-22'),
	(88, 88, 2, 6, '2023-10-16'),
	(89, 89, 1, 10, '2023-10-27'),
	(90, 90, 2, 45, '2023-10-22'),
	(91, 91, 2, 6, '2023-10-16'),
	(92, 92, 2, 73, '2023-10-16'),
	(93, 93, 2, 14, '2023-10-21'),
	(94, 94, 2, 25, '2023-11-01'),
	(95, 95, 1, 12, '2023-10-18'),
	(96, 96, 1, 27, '2023-10-16'),
	(97, 97, 1, 94, '2023-11-01'),
	(98, 98, 1, 41, '2023-10-15'),
	(99, 99, 2, 64, '2023-10-17');

-- Dumping structure for table peas4ntdb.products_tips
DROP TABLE IF EXISTS `products_tips`;
CREATE TABLE IF NOT EXISTS `products_tips` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'tipa name',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='produktu tipa table';

-- Dumping data for table peas4ntdb.products_tips: ~4 rows (approximately)
INSERT INTO `products_tips` (`id`, `name`) VALUES
	(1, 'Electronics'),
	(2, 'Clothing'),
	(3, 'Furniture'),
	(4, 'Food');

-- Dumping structure for table peas4ntdb.storage
DROP TABLE IF EXISTS `storage`;
CREATE TABLE IF NOT EXISTS `storage` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `code_id` int unsigned NOT NULL COMMENT 'produkta code id',
  `product_tip` int NOT NULL COMMENT 'produkta tips',
  `user_id` int unsigned DEFAULT NULL COMMENT 'produkta veidotājs',
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'produkta nosaukums',
  `cost` decimal(8,2) NOT NULL COMMENT 'produkta cena',
  `quantity` int NOT NULL COMMENT 'produkta daudzums',
  `serial_num` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'produkta serīja',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='produktu table';

-- Dumping data for table peas4ntdb.storage: ~99 rows (approximately)
INSERT INTO `storage` (`id`, `code_id`, `product_tip`, `user_id`, `name`, `cost`, `quantity`, `serial_num`) VALUES
	(1, 1, 4, 1, 'Product_01', 744.64, 26, '1016414371'),
	(2, 2, 3, 1, 'Product_02', 26.53, 44, '1422849596'),
	(3, 3, 2, 1, 'Product_03', 188.22, 54, '1714841482'),
	(4, 4, 1, 2, 'Product_04', 173.98, 17, '3639113561'),
	(5, 5, 2, 1, 'Product_05', 878.48, 34, '0986401709'),
	(6, 6, 2, 2, 'Product_06', 480.98, 50, '0638304632'),
	(7, 7, 4, 2, 'Product_07', 974.54, 22, '1804096178'),
	(8, 8, 1, 2, 'Product_08', 565.80, 85, '5934216450'),
	(9, 9, 2, 1, 'Product_09', 736.37, 13, '4574271844'),
	(10, 10, 4, 1, 'Product_10', 657.29, 9, '5036752498'),
	(11, 11, 1, 2, 'Product_11', 571.77, 89, '7662255584'),
	(12, 12, 1, 1, 'Product_12', 635.24, 93, '7896508832'),
	(13, 13, 1, 1, 'Product_13', 37.98, 33, '5422800318'),
	(14, 14, 3, 2, 'Product_14', 654.58, 38, '9779201968'),
	(15, 15, 3, 2, 'Product_15', 272.62, 29, '6582805594'),
	(16, 16, 2, 1, 'Product_16', 51.62, 9, '3292552375'),
	(17, 17, 2, 2, 'Product_17', 889.03, 7, '6893372625'),
	(18, 18, 1, 1, 'Product_18', 782.05, 62, '7634774350'),
	(19, 19, 4, 1, 'Product_19', 483.41, 1, '6202998175'),
	(20, 20, 1, 1, 'Product_20', 997.36, 68, '4172521199'),
	(21, 21, 1, 2, 'Product_21', 635.79, 32, '7140591746'),
	(22, 22, 3, 2, 'Product_22', 432.74, 62, '8450553889'),
	(23, 23, 2, 1, 'Product_23', 789.17, 46, '9403572583'),
	(24, 24, 2, 2, 'Product_24', 870.11, 5, '6785345576'),
	(25, 25, 1, 1, 'Product_25', 647.68, 5, '3316966921'),
	(26, 26, 2, 1, 'Product_26', 884.82, 0, '3687613432'),
	(27, 27, 4, 1, 'Product_27', 725.77, 49, '3207229788'),
	(28, 28, 1, 2, 'Product_28', 494.77, 78, '4574252324'),
	(29, 29, 4, 1, 'Product_29', 424.49, 40, '7665718651'),
	(30, 30, 3, 2, 'Product_30', 895.72, 24, '5392075120'),
	(31, 31, 4, 1, 'Product_31', 36.64, 63, '0541549129'),
	(32, 32, 2, 2, 'Product_32', 379.06, 79, '8511090593'),
	(33, 33, 4, 2, 'Product_33', 209.97, 77, '2262565746'),
	(34, 34, 4, 1, 'Product_34', 593.01, 73, '9089841058'),
	(35, 35, 2, 2, 'Product_35', 671.59, 55, '7712464525'),
	(36, 36, 1, 2, 'Product_36', 493.00, 63, '7054176764'),
	(37, 37, 3, 2, 'Product_37', 980.32, 0, '0782227684'),
	(38, 38, 2, 2, 'Product_38', 177.82, 89, '9621259000'),
	(39, 39, 1, 2, 'Product_39', 60.38, 26, '1276078439'),
	(40, 40, 4, 2, 'Product_40', 847.38, 59, '4250139299'),
	(41, 41, 2, 1, 'Product_41', 210.00, 70, '8868785032'),
	(42, 42, 2, 2, 'Product_42', 830.84, 27, '8674453299'),
	(43, 43, 3, 1, 'Product_43', 455.88, 26, '9704232792'),
	(44, 44, 1, 1, 'Product_44', 527.83, 63, '5851596114'),
	(45, 45, 1, 1, 'Product_45', 764.17, 71, '2976079278'),
	(46, 46, 2, 2, 'Product_46', 883.35, 8, '7779458320'),
	(47, 47, 3, 2, 'Product_47', 255.14, 78, '1514137733'),
	(48, 48, 2, 2, 'Product_48', 681.96, 66, '2945162805'),
	(49, 49, 2, 1, 'Product_49', 885.96, 5, '6180047519'),
	(50, 50, 4, 2, 'Product_50', 68.95, 3, '9895908067'),
	(51, 51, 4, 1, 'Product_51', 418.00, 54, '4713232483'),
	(52, 52, 3, 1, 'Product_52', 801.26, 42, '7312632078'),
	(53, 53, 2, 2, 'Product_53', 287.33, 38, '0817201929'),
	(54, 54, 1, 2, 'Product_54', 106.41, 63, '8403629648'),
	(55, 55, 2, 1, 'Product_55', 128.00, 61, '6774042822'),
	(56, 56, 3, 2, 'Product_56', 942.88, 55, '9631537560'),
	(57, 57, 1, 2, 'Product_57', 647.83, 79, '0425876099'),
	(58, 58, 4, 2, 'Product_58', 429.58, 21, '7703998309'),
	(59, 59, 1, 2, 'Product_59', 207.35, 72, '9909993595'),
	(60, 60, 4, 2, 'Product_60', 452.71, 37, '5169343477'),
	(61, 61, 2, 2, 'Product_61', 358.00, 54, '6653564782'),
	(62, 62, 3, 1, 'Product_62', 49.17, 98, '7857968674'),
	(63, 63, 4, 1, 'Product_63', 531.04, 19, '3687931348'),
	(64, 64, 2, 1, 'Product_64', 338.03, 0, '0212730430'),
	(65, 65, 1, 1, 'Product_65', 554.07, 68, '7610445112'),
	(66, 66, 4, 1, 'Product_66', 112.25, 14, '3713426173'),
	(67, 67, 2, 1, 'Product_67', 930.70, 51, '7965822887'),
	(68, 68, 2, 2, 'Product_68', 504.74, 24, '7226578515'),
	(69, 69, 4, 1, 'Product_69', 325.86, 6, '3508727767'),
	(70, 70, 3, 2, 'Product_70', 997.22, 78, '9315256670'),
	(71, 71, 2, 2, 'Product_71', 709.04, 37, '7383120941'),
	(72, 72, 3, 2, 'Product_72', 515.80, 63, '6496397066'),
	(73, 73, 2, 2, 'Product_73', 514.66, 47, '8087663657'),
	(74, 74, 3, 2, 'Product_74', 776.72, 67, '0679786587'),
	(75, 75, 2, 1, 'Product_75', 602.49, 10, '7383326381'),
	(76, 76, 2, 2, 'Product_76', 936.81, 86, '5218652034'),
	(77, 77, 1, 1, 'Product_77', 390.84, 50, '3363819413'),
	(78, 78, 1, 2, 'Product_78', 838.91, 57, '3501569631'),
	(79, 79, 1, 1, 'Product_79', 421.93, 80, '7407467855'),
	(80, 80, 2, 1, 'Product_80', 484.83, 59, '5134046026'),
	(81, 81, 4, 1, 'Product_81', 597.21, 81, '2703578493'),
	(82, 82, 4, 2, 'Product_82', 65.89, 4, '0205471450'),
	(83, 83, 4, 2, 'Product_83', 71.39, 96, '6101194178'),
	(84, 84, 1, 2, 'Product_84', 280.92, 55, '9332229521'),
	(85, 85, 1, 1, 'Product_85', 13.14, 45, '2448738377'),
	(86, 86, 4, 2, 'Product_86', 110.53, 94, '4157711885'),
	(87, 87, 1, 2, 'Product_87', 833.27, 45, '7581984360'),
	(88, 88, 2, 2, 'Product_88', 222.94, 39, '3103322864'),
	(89, 89, 2, 2, 'Product_89', 356.60, 11, '4979403842'),
	(90, 90, 1, 1, 'Product_90', 810.15, 29, '0513590882'),
	(91, 91, 2, 2, 'Product_91', 319.19, 54, '7551795511'),
	(92, 92, 1, 1, 'Product_92', 933.89, 24, '4096174215'),
	(93, 93, 2, 1, 'Product_93', 924.68, 49, '6771037491'),
	(94, 94, 4, 2, 'Product_94', 969.71, 22, '1910344186'),
	(95, 95, 2, 2, 'Product_95', 626.07, 42, '2395943787'),
	(96, 96, 4, 2, 'Product_96', 806.63, 28, '9803827161'),
	(97, 97, 1, 1, 'Product_97', 652.57, 16, '8431102919'),
	(98, 98, 3, 1, 'Product_98', 524.75, 18, '3547185876'),
	(99, 99, 1, 1, 'Product_99', 435.79, 12, '3341537046');

-- Dumping structure for table peas4ntdb.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'lietotāja vārds',
  `lastname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'lietotāja uzvards',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'lietotāja email',
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'lietotāja parole',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='users table';

-- Dumping data for table peas4ntdb.users: ~2 rows (approximately)
INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `password`) VALUES
	(1, 'Maksims', 'Lisnojs', 'mlisnojs@gmail.com', 'maks228'),
	(2, 'Vladislavs', 'Teclavs', 'vladislavsteclavs@gmail.com', '1');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

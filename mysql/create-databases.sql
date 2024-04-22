CREATE DATABASE  IF NOT EXISTS `supplier_service` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `supplier_service`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: supplier_service
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `import_order`
--

DROP TABLE IF EXISTS `import_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `import_date` datetime(6) DEFAULT NULL,
  `shipping_cost` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `import_order_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_order`
--

LOCK TABLES `import_order` WRITE;
/*!40000 ALTER TABLE `import_order` DISABLE KEYS */;
INSERT INTO `import_order` VALUES (16,6,12,'2024-01-08 00:00:00.000000',22384.1),(17,10,11,'2024-01-16 00:00:00.000000',20251.97),(18,8,13,'2024-02-10 00:00:00.000000',23312.98),(19,6,14,'2024-01-20 00:00:00.000000',25942.75),(20,5,12,'2024-03-10 00:00:00.000000',20013.12),(21,2,13,'2024-02-12 00:00:00.000000',23138.49),(22,5,10,'2024-01-17 00:00:00.000000',25437.65),(23,3,14,'2024-03-10 00:00:00.000000',20897.16),(24,6,13,'2024-01-09 00:00:00.000000',27275.57),(25,5,14,'2024-04-15 00:00:00.000000',22849.36),(31,6,15,'2024-04-09 00:00:00.000000',58009.69),(32,3,15,'2024-01-14 00:00:00.000000',56525.65),(33,9,12,'2024-03-14 00:00:00.000000',59513.87),(34,8,15,'2024-01-26 00:00:00.000000',54678.41),(35,7,14,'2024-01-20 00:00:00.000000',54073.01),(36,6,12,'2024-01-19 00:00:00.000000',58091.26),(37,6,11,'2024-04-08 00:00:00.000000',55387.6),(38,1,12,'2024-02-07 00:00:00.000000',52554.2),(39,3,13,'2024-04-10 00:00:00.000000',59695.58),(40,1,13,'2024-02-25 00:00:00.000000',58693.22);
/*!40000 ALTER TABLE `import_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_product`
--

DROP TABLE IF EXISTS `import_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `import_order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `import_price` double DEFAULT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `import_order_id` (`import_order_id`),
  CONSTRAINT `import_product_ibfk_1` FOREIGN KEY (`import_order_id`) REFERENCES `import_order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_product`
--

LOCK TABLES `import_product` WRITE;
/*!40000 ALTER TABLE `import_product` DISABLE KEYS */;
INSERT INTO `import_product` VALUES (8,16,6,170000,9),(9,16,16,210000,5),(10,19,6,180000,10),(11,24,16,200000,8),(12,31,16,190000,12),(13,31,6,180000,10),(14,36,6,180000,11),(15,37,6,160000,19),(16,17,10,225000,10),(17,17,20,130000,10),(18,18,8,35000,10),(19,18,18,41000,10),(20,34,8,37000,20),(21,34,18,44000,15),(22,20,5,30000,10),(23,20,15,25000,10),(24,22,5,31000,20),(25,22,15,24000,14),(26,25,5,29000,12),(27,25,15,24000,25),(28,21,2,20000,30),(29,21,12,15000,20),(30,23,3,30000,10),(31,23,13,50000,10),(32,32,3,28000,10),(33,32,13,45000,13),(34,39,3,29000,15),(35,39,13,44000,15),(36,33,9,130000,10),(37,33,19,140000,10),(38,35,7,25000,20),(39,35,17,30000,20),(40,38,1,250000,5),(41,38,11,180000,5),(42,40,1,250000,8),(43,40,11,180000,6);
/*!40000 ALTER TABLE `import_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `importorder`
--

DROP TABLE IF EXISTS `importorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `importorder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `import_date` datetime(6) DEFAULT NULL,
  `shipping_cost` double DEFAULT NULL,
  `supplier_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK97ev7odiceyeo0q9mf80kn5al` (`supplier_id`),
  CONSTRAINT `FK97ev7odiceyeo0q9mf80kn5al` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `importorder`
--

LOCK TABLES `importorder` WRITE;
/*!40000 ALTER TABLE `importorder` DISABLE KEYS */;
/*!40000 ALTER TABLE `importorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'Nhà cung cấp Hải Sản Nam Định','Chuyên cung cấp các loại hải sản tươi ngon từ vùng biển Nam Định.'),(2,'Cửa hàng Rau sạch Hà Nội','Cung cấp rau sạch từ các trang trại organic ở ngoại ô Hà Nội.'),(3,'Công ty Gạo Lúa Việt','Sản xuất và cung cấp gạo ngon từ các vùng lúa chính của Việt Nam.'),(4,'Nhà sản xuất Thịt Heo Đà Nẵng','Chuyên cung cấp thịt heo tươi ngon từ Đà Nẵng.'),(5,'Cửa hàng Sữa tươi Sài Gòn','Cung cấp sữa tươi từ các trang trại bò sữa ở Sài Gòn.'),(6,'Công ty Hải Sản Phan Thiết','Sản xuất và cung cấp các loại hải sản tươi ngon từ vùng biển Phan Thiết.'),(7,'Nhà cung cấp Rau Hữu cơ Đà Lạt','Chuyên cung cấp rau hữu cơ từ vùng cao nguyên Đà Lạt.'),(8,'Cửa hàng Gạo Lào Cai','Cung cấp gạo ngon từ vùng lúa của Lào Cai.'),(9,'Nhà sản xuất Thịt Gà Hải Dương','Chuyên cung cấp thịt gà tươi ngon từ Hải Dương.'),(10,'Cửa hàng Hải Sản Nha Trang','Cung cấp hải sản tươi ngon từ vùng biển Nha Trang.');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-22  1:20:06
CREATE DATABASE  IF NOT EXISTS `reseller_service` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `reseller_service`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: reseller_service
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `export_order`
--

DROP TABLE IF EXISTS `export_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reseller_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `order_date` timestamp NOT NULL,
  `order_status` varchar(255) NOT NULL,
  `export_date` timestamp NOT NULL,
  `shipping_cost` decimal(19,2) NOT NULL,
  `shipping_code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reseller_id` (`reseller_id`),
  CONSTRAINT `export_order_ibfk_1` FOREIGN KEY (`reseller_id`) REFERENCES `reseller` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_order`
--

LOCK TABLES `export_order` WRITE;
/*!40000 ALTER TABLE `export_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `export_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `export_product`
--

DROP TABLE IF EXISTS `export_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `export_order_id` int NOT NULL,
  `export_price` decimal(19,2) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `export_order_id` (`export_order_id`),
  CONSTRAINT `export_product_ibfk_1` FOREIGN KEY (`export_order_id`) REFERENCES `export_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_product`
--

LOCK TABLES `export_product` WRITE;
/*!40000 ALTER TABLE `export_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `export_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reseller`
--

DROP TABLE IF EXISTS `reseller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reseller` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `zipcode` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reseller`
--

LOCK TABLES `reseller` WRITE;
/*!40000 ALTER TABLE `reseller` DISABLE KEYS */;
INSERT INTO `reseller` VALUES (1,'Đại Lý ABC','123 Đường Nguyễn Văn A','Hồ Chí Minh','Quận 1','700000'),(2,'Cửa Hàng XYZ','456 Đường Lê Lợi','Hà Nội','Ba Đình','100000'),(3,'Đại Lý CDE','789 Đường Trần Hưng Đạo','Đà Nẵng','Quận Hải Châu','550000'),(4,'Cửa Hàng KLM','101 Đường Nguyễn Thị Minh Khai','Hải Phòng','Quận Ngô Quyền','408'),(7,'Đại lý Pson','Trần Phú','Hà Nội','Hà Nội','121107');
/*!40000 ALTER TABLE `reseller` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-22  1:20:06
CREATE DATABASE  IF NOT EXISTS `product_service` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `product_service`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: product_service
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` double DEFAULT NULL,
  `unit` varchar(255) NOT NULL,
  `weight` double DEFAULT NULL,
  `supplier_id` int NOT NULL,
  `available_amount` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Cá hồi tươi',250000,'kg',1,1,50),(2,'Rau cải thảo',20000,'kg',0.5,2,100),(3,'Gạo lứt',30000,'kg',1,3,200),(4,'Thịt heo ba chỉ',150000,'kg',0.8,4,80),(5,'Sữa tươi nguyên chất',30000,'lít',1,5,150),(6,'Tôm sú',180000,'kg',0.5,6,60),(7,'Rau cải xanh hữu cơ',25000,'kg',0.7,7,120),(8,'Gạo nếp cái hòa',35000,'kg',1,8,180),(9,'Thịt gà ta',120000,'kg',0.6,9,70),(10,'Cua biển Nha Trang',220000,'kg',0.4,10,40),(11,'Cá thu đông lạnh',180000,'kg',0.8,1,60),(12,'Rau muống',15000,'kg',0.4,2,80),(13,'Gạo ST25',50000,'kg',1,3,150),(14,'Thịt lợn xông khói',180000,'kg',0.7,4,90),(15,'Sữa đậu nành',25000,'lít',1,5,120),(16,'Mực ống',200000,'kg',0.6,6,50),(17,'Rau mầm hữu cơ',30000,'kg',0.3,7,100),(18,'Gạo nếp cái sữa',40000,'kg',1,8,200),(19,'Thịt gà ta tươi',130000,'kg',0.5,9,80),(20,'Cá basa đông lạnh',120000,'kg',1,10,70);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-22  1:20:06
CREATE DATABASE  IF NOT EXISTS `user_service` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `user_service`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: user_service
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (10,'nhanvien1','matkhau123','nhanvien1@example.com','employee','Nguyễn Văn A','0123456789'),(11,'nhanvien2','matkhau456','nhanvien2@example.com','employee','Trần Thị B','9876543210'),(12,'nhanvien3','matkhau789','nhanvien3@example.com','employee','Lê Văn C','0987654321'),(13,'quanly1','matkhau123','quanly1@example.com','manager','Đỗ Thị D','012453489'),(14,'quanly2','matkhau456','quanly2@example.com','manager','Phạm Văn E','098734210'),(15,'quanly3','matkhau789','quanly3@example.com','manager','Huỳnh Thị F','098487321'),(16,'khachhang1','matkhau123','khachhang1@example.com','customer','Nguyễn Thị G','014536789'),(17,'khachhang2','matkhau456','khachhang2@example.com','customer','Trần Văn H','056543210'),(18,'khachhang3','matkhau789','khachhang3@example.com','customer','Lê Thị I','0987644321');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */;
INSERT INTO `user_seq` VALUES (1);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-22  1:20:06

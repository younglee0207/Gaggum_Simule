-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: j8b310.p.ssafy.io    Database: B310
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
-- Table structure for table `diaries`
--

DROP TABLE IF EXISTS `diaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diaries` (
  `diary_number` int NOT NULL AUTO_INCREMENT,
  `plant_number` int NOT NULL,
  `diary_title` varchar(45) DEFAULT NULL,
  `diary_img` varchar(100) DEFAULT NULL,
  `diary_memo` varchar(200) DEFAULT NULL,
  `diary_date` date NOT NULL,
  `diary_isdelete` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`diary_number`),
  UNIQUE KEY `diary_number_UNIQUE` (`diary_number`),
  KEY `plant_number_idx` (`plant_number`),
  CONSTRAINT `plant_number` FOREIGN KEY (`plant_number`) REFERENCES `plants` (`plant_number`)
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diaries`
--

LOCK TABLES `diaries` WRITE;
/*!40000 ALTER TABLE `diaries` DISABLE KEYS */;
INSERT INTO `diaries` VALUES (37,1,'안티프레지아 4월 4일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월4일','안티프레지아 물주기 안티티티티티티티티티티티티티','2023-04-04',1),(38,3,'하잎보이 4월 4일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월4일','하잎보이 물주기','2023-04-04',0),(39,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-04',0),(40,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-04',0),(99,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(100,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(101,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(102,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(103,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(104,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기...','2023-04-05',0),(105,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(106,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(107,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(108,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(109,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(110,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(111,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(112,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(113,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(114,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(115,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(116,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(117,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(118,4,'러브다이브 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant4/4월5일','러브다이브 물주기ㅁㄴㅇㅁㄴㅇㄴㅁㅇㅁㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅁㄴㅇㄴㅁㅇㄴㅇ','2023-04-05',1),(119,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(120,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(121,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(122,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(123,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(124,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(125,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(126,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(127,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(128,1,'안티프레지아 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월5일','안티프레지아 물주기','2023-04-05',0),(129,3,'하잎보이 4월 5일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월5일','하잎보이 물주기','2023-04-05',0),(130,1,'안티프레지아 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월6일','안티프레지아 물주기','2023-04-06',0),(131,1,'안티프레지아 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월6일','안티프레지아 물주기','2023-04-06',0),(132,3,'하잎보이 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월6일','하잎보이 물주기','2023-04-06',0),(133,1,'안티프레지아 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월6일','안티프레지아 물주기','2023-04-06',1),(134,3,'하잎보이 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월6일','하잎보이 물주기','2023-04-06',0),(136,1,'안티프레지아 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월6일','안티프레지아 물주기','2023-04-06',0),(137,1,'안티프레지아 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월6일','안티프레지아 물주기','2023-04-06',0),(138,3,'하잎보이 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월6일','하잎보이 물주기','2023-04-06',0),(139,1,'안티프레지아 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월6일','안티프레지아 물주기','2023-04-06',0),(140,1,'안티프레지아 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월6일','안티프레지아 물주기','2023-04-06',0),(141,3,'하잎보이 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월6일','하잎보이 물주기','2023-04-06',0),(142,1,'안티프레지아 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월6일','안티프레지아 물주기','2023-04-06',0),(143,3,'하잎보이 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월6일','하잎보이 물주기','2023-04-06',0),(144,1,'안티프레지아 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant1/4월6일','안티프레지아 물주기','2023-04-06',0),(145,3,'하잎보이 4월 6일','https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/diary/plant3/4월6일','하잎보이 물주기','2023-04-06',0);
/*!40000 ALTER TABLE `diaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plants`
--

DROP TABLE IF EXISTS `plants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plants` (
  `plant_number` int NOT NULL AUTO_INCREMENT,
  `user_number` int NOT NULL,
  `plant_name` varchar(45) NOT NULL,
  `plant_species` varchar(45) NOT NULL,
  `plant_memo` varchar(200) DEFAULT NULL,
  `plant_position_x` double NOT NULL DEFAULT '0',
  `plant_position_y` double NOT NULL DEFAULT '0',
  `plant_img` varchar(100) DEFAULT NULL,
  `plant_watering_cycle` int NOT NULL,
  `plant_watering_amount` int NOT NULL,
  `plant_last_watering_date` date NOT NULL,
  `plant_sunlight` tinyint NOT NULL,
  `plant_isdelete` tinyint NOT NULL DEFAULT '0',
  `plant_create_date` date NOT NULL,
  `sunspot_number` int NOT NULL,
  `plant_original_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`plant_number`),
  UNIQUE KEY `plant_number_UNIQUE` (`plant_number`),
  KEY `user_idx` (`user_number`),
  KEY `sunspot_idx` (`sunspot_number`),
  CONSTRAINT `sunspot` FOREIGN KEY (`sunspot_number`) REFERENCES `sunspot` (`sunspot_number`),
  CONSTRAINT `user` FOREIGN KEY (`user_number`) REFERENCES `users` (`user_number`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plants`
--

LOCK TABLES `plants` WRITE;
/*!40000 ALTER TABLE `plants` DISABLE KEYS */;
INSERT INTO `plants` VALUES (1,1,'안티프레지아','비비추','Anti-ti-ti-ti fragile, fragile',-4.87,3.48,'https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/plant1.jpg',1,100,'2023-04-03',1,0,'2023-03-22',0,'plant1'),(2,1,'디토','극락조','oh, say it, ditto',-2.92,3.49,'https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/plant2.jpg',1,200,'2023-04-03',1,0,'2023-03-28',0,'plant2'),(3,1,'하잎보이','포인세티아','Cause I~~~~~~',-7.54,3.53,'https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/plant3.jpg',1,300,'2023-04-03',0,0,'2023-04-02',0,'plant3'),(4,1,'러브다이브','싱고니움','숨참고 러브다이브',-1.92,12.37,'https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/plant4.jpg',1,400,'2023-04-06',0,0,'2023-04-02',0,'plant4'),(17,1,'복둥이','칼라듐','예쁘다 예뻐',-3.368330717086792,15.224356651306152,'https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/plant5',3,300,'2023-04-06',0,0,'2023-04-06',0,'plant5');
/*!40000 ALTER TABLE `plants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sunspot`
--

DROP TABLE IF EXISTS `sunspot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sunspot` (
  `sunspot_number` int NOT NULL AUTO_INCREMENT,
  `sunspot_isplant` tinyint NOT NULL DEFAULT '0',
  `sunspot_x_position` double NOT NULL DEFAULT '0',
  `sunspot_y_position` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`sunspot_number`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sunspot`
--

LOCK TABLES `sunspot` WRITE;
/*!40000 ALTER TABLE `sunspot` DISABLE KEYS */;
INSERT INTO `sunspot` VALUES (0,0,0,0),(2,0,-1.99,4.53),(3,0,-2.24,6.01),(4,0,-2.11,9.34),(5,0,-2.07,10.1);
/*!40000 ALTER TABLE `sunspot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turtles`
--

DROP TABLE IF EXISTS `turtles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turtles` (
  `turtle_number` int NOT NULL AUTO_INCREMENT,
  `turtle_key` varchar(45) NOT NULL,
  PRIMARY KEY (`turtle_number`),
  UNIQUE KEY `turtle_key_UNIQUE` (`turtle_key`),
  UNIQUE KEY `turtle_number_UNIQUE` (`turtle_number`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turtles`
--

LOCK TABLES `turtles` WRITE;
/*!40000 ALTER TABLE `turtles` DISABLE KEYS */;
INSERT INTO `turtles` VALUES (0,'none'),(1,'testkey');
/*!40000 ALTER TABLE `turtles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_number` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `user_isdelete` tinyint DEFAULT '0',
  `turtle_number` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_number`),
  UNIQUE KEY `user_number_UNIQUE` (`user_number`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  KEY `turtle_number_idx` (`turtle_number`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test@test.com','김싸피',0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-06 18:35:38

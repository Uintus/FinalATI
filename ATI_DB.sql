CREATE DATABASE  IF NOT EXISTS `atifinalproject` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `atifinalproject`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: atifinalproject
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `enrollment`
--

DROP TABLE IF EXISTS `enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_id` int NOT NULL,
  `student_id` int NOT NULL,
  `score` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`),
  CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
INSERT INTO `enrollment` VALUES (1,26,7,0),(2,26,8,0),(3,27,15,0),(4,28,7,0),(5,29,11,0),(6,30,19,0),(7,27,11,0),(8,30,12,0),(9,26,17,0),(10,27,7,0),(11,26,18,0),(12,30,18,0),(13,28,17,0),(30,26,22,0);
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_answer`
--

DROP TABLE IF EXISTS `student_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_answer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `q_1` int NOT NULL,
  `q_2` int NOT NULL,
  `q_3` int NOT NULL,
  `q_4` int NOT NULL,
  `q_5` int NOT NULL,
  `q_6` int NOT NULL,
  `q_7` int NOT NULL,
  `q_8` int NOT NULL,
  `q_9` int NOT NULL,
  `q_10` int NOT NULL,
  `student_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `student_answer_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_answer`
--

LOCK TABLES `student_answer` WRITE;
/*!40000 ALTER TABLE `student_answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `msv` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (7,'Tuyet Dang','6C21','2157'),(8,'Dang Thi Tu Uyen','7K7K','2949'),(9,'Tran Thi Thue','6C21','2442'),(10,'Hoang Anh Nhan','4C21','1897'),(11,'Nguyen Thi Huyen','7C19','1927'),(12,'Hoang Thien Co','2L19','7921'),(13,'Van Hoang','9A11','6213'),(14,'Nguyen Thi Huyen','7C19','1927'),(15,'Nguyen Thi Phuong Anh','8C19','1234'),(16,'Pham Thi Huyen','7C17','6893'),(17,'Nguyen Mai Huyen','20K1','7421'),(18,'Nguyen Thi Linh','2C98','7954'),(19,'Nguyen Thi Mai','2K21','7952'),(20,'Nguyen Mai Thuy Huyen','5K19','0912'),(21,'Nguyen Thi Quyen','6C19','6471'),(22,'Nguyen Thi Tuyet','5C21','2422');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(255) NOT NULL,
  `subject_des` text,
  `q_1` varchar(255) NOT NULL,
  `q_2` varchar(255) NOT NULL,
  `q_3` varchar(255) NOT NULL,
  `q_4` varchar(255) NOT NULL,
  `q_5` varchar(255) NOT NULL,
  `q_6` varchar(255) NOT NULL,
  `q_7` varchar(255) NOT NULL,
  `q_8` varchar(255) NOT NULL,
  `q_9` varchar(255) NOT NULL,
  `q_10` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (26,'Artificial Intelligence','Artificial intelligence is the simulation of human intelligence processes by machines, especially computer systems.','D','C','D','B','D','C','B','A','A','D'),(27,'Advance Topics in IT','ATI specializes in technical training for satellite communications, space, defense, radar, sonar and acoustics, signal processing, and engineering.','B','B','B','D','C','D','B','C','A','D'),(28,'Discrete Mathematics','Discrete mathematics is the study of mathematical structures that are discrete, separated or distinct; in contrast with calculus which deals with continuous change.','A','D','C','C','B','D','B','A','A','D'),(29,'Data Science','Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data.','B','D','C','C','C','B','C','A','A','D'),(30,'Machine Learning','Machine learning (ML) is a field of study in artificial intelligence concerned with the development and study of statistical algorithms that can learn from data and generalize to unseen data, and thus perform tasks without explicit instructions.','B','D','A','A','C','D','B','C','C','C');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-15 18:10:22

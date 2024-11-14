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
-- Table structure for table `correct_answer`
--

DROP TABLE IF EXISTS `correct_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `correct_answer` (
  `id` int NOT NULL AUTO_INCREMENT,
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
  `subject_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `correct_answer_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `correct_answer`
--

LOCK TABLES `correct_answer` WRITE;
/*!40000 ALTER TABLE `correct_answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `correct_answer` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`),
  CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
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
  `score` float NOT NULL,
  `class` varchar(255) NOT NULL,
  `msv` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Nguyen Van A',0,'6C21','2101040111'),(2,'Nguyen Van B',0,'6C21','2101040151'),(3,'Nguyen Van C',0,'5C21','2101040678'),(4,'Nguyen Thi H',0,'1C21','2101040123'),(5,'Nguyen Van T',0,'6C20','2101040321'),(6,'Nguyen Van Q',0,'4C21','21010401789');
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
  `avg_score` float NOT NULL,
  `highest_score` float NOT NULL,
  `lowest_score` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
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

-- Dump completed on 2024-11-14  9:43:44

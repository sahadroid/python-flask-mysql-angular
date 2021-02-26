-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2021 at 03:52 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `canopy`
--

-- --------------------------------------------------------

--
-- Table structure for table `incidents`
--

CREATE TABLE `incidents` (
  `id` varchar(30) NOT NULL,
  `severity` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `device` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `starttime` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `incidents`
--

INSERT INTO `incidents` (`id`, `severity`, `category`, `device`, `name`, `starttime`, `status`) VALUES
('1', 'Info', 'Site', 'Site', 'Internet Down', '2021-02-01 09:18:03', 'Unresolved'),
('2', 'Warning', 'Solar', 'PV Inverter 1', 'Reverse Current', ' 2021-02-26 09:47:21', 'Resolved'),
('3', 'Warning', 'Solar', 'Gensys A', 'Disconnected', '2021-02-09 09:18:12', 'Unresolved'),
('308373', 'Info', 'Genset', 'PV Inverter 1', 'Internet Down', '2021-02-26 09:47:21', 'Resolved'),
('4165626', 'Warning', 'Solar', 'PV Inverter 3', 'Connected', '2021-02-26 09:47:21', 'Unresolved'),
('6126731', 'Info', 'Solar', 'Gensys', 'Internet Down', '2021-02-26 09:51:20', 'Resolved');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `incidents`
--
ALTER TABLE `incidents`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

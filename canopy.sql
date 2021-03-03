-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2021 at 09:42 AM
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
-- Table structure for table `subcribes`
--

CREATE TABLE `subcribes` (
  `id_subscribe` varchar(40) NOT NULL,
  `created_date` date NOT NULL,
  `id_users` varchar(40) NOT NULL,
  `periode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcribes`
--

INSERT INTO `subcribes` (`id_subscribe`, `created_date`, `id_users`, `periode`) VALUES
('1307733', '2021-03-03', '1339606', 'weekly'),
('2806936', '2021-03-03', '1339606', 'monthly'),
('3626633', '2021-03-03', '1339606', 'monthly'),
('3871093', '2021-03-03', '1145259', 'weekly'),
('5310296', '2021-03-03', '1339606', 'weekly'),
('8046808', '2021-03-03', '1145259', 'monthly'),
('8415206', '2021-03-03', '1145259', 'monthly');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` varchar(30) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_date` datetime NOT NULL,
  `status_active` varchar(1) NOT NULL,
  `periode_weekly` varchar(1) NOT NULL,
  `periode_monthly` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `fullname`, `phone`, `email`, `created_date`, `status_active`, `periode_weekly`, `periode_monthly`) VALUES
('1145259', 'Thomas Muller', '0812 9333 3432', 'thomas@gmail.com', '2021-02-27 01:03:05', 'Y', 'Y', 'N'),
('2162016', 'Rudi Salam', '0812 3434 9543', 'rudi@gmail.com', '2021-01-11 02:04:02', 'N', 'Y', 'Y'),
('7969829', 'Siska', '0834 8454 8454', 'siska@gmail.com', '2021-01-11 01:04:07', 'Y', 'Y', 'N'),
('8159554', 'Wawan Sinulingga', '0823 8745 0823', 'wawan@gmail.com', '2021-01-11 02:04:15', 'Y', 'N', 'Y'),
('9625001', 'Lia Waroka', '0823 8743 2432', 'lia@gmail.com', '2021-01-10 00:00:00', 'Y', 'N', 'Y');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `subcribes`
--
ALTER TABLE `subcribes`
  ADD PRIMARY KEY (`id_subscribe`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

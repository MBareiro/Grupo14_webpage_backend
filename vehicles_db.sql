-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-06-2024 a las 01:29:17
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vehicles_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `model` varchar(255) NOT NULL,
  `license_plate` varchar(50) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `history_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `parameters_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cars`
--

INSERT INTO `cars` (`id`, `model`, `license_plate`, `image`, `history_id`, `user_id`, `parameters_id`) VALUES
(1, 'PL', 'asd', NULL, NULL, 18, NULL),
(2, 'PL', 'asd', NULL, NULL, 19, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `message`) VALUES
(1, 'dsf', 'gf@dfg', 'sd'),
(2, 'martin', 'm@asd', 'asdasd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `origin` text DEFAULT NULL,
  `design` text DEFAULT NULL,
  `engine` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parameters`
--

CREATE TABLE `parameters` (
  `id` int(11) NOT NULL,
  `engine` varchar(255) DEFAULT NULL,
  `displacement` varchar(255) DEFAULT NULL,
  `fuel_system` varchar(255) DEFAULT NULL,
  `compression_ratio` varchar(255) DEFAULT NULL,
  `power_output` varchar(255) DEFAULT NULL,
  `max_speed` varchar(255) DEFAULT NULL,
  `fuel_consumption` varchar(255) DEFAULT NULL,
  `transmission` varchar(255) DEFAULT NULL,
  `brakes` varchar(255) DEFAULT NULL,
  `tires` varchar(255) DEFAULT NULL,
  `front_track` varchar(255) DEFAULT NULL,
  `rear_track` varchar(255) DEFAULT NULL,
  `length` varchar(255) DEFAULT NULL,
  `width` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `country`, `city`) VALUES
(1, 'mar', 'mar@bar', '$2b$10$ztNoVEuSNUFGUPG9BqFSPeCVVs08n7aASBRK6WTMl6arIVBLPurJ2', 'AZE', 'asdsd'),
(2, 'asd', 'm@as', '$2b$10$aLv41Yd68WUUl9PRMsLYIu45jguvbz94xNte1CicV9UV4gD37oR.a', 'BRB', '123'),
(3, 'asd', 'a@as', '$2b$10$a55KqdiJZD9A3KC9Iq2FVekuflzwBaraTgb.k42g79Szpq1/alIUi', 'BHR', '23'),
(4, 'asd', 'aasd@a', '$2b$10$i9ohcqtI2/.djPXZoGYiLO7DwctwoIcW1TxHLmK1miMnBrkuQvUCi', 'AUS', '23'),
(6, 'asd', 'aasd@aff', '$2b$10$8FHfW7dsAoToyXv7EgSpmu1hJoFjaCTksCAA8xXplytncyA7pCobS', 'AUS', '23'),
(8, 'asd', 'asd@qq', '$2b$10$02AlPwMMXJ6aVNyZyJLU/.J33IIUJpi497hyzuS0PkgdyjXE4xRQm', 'AZE', 'sd'),
(9, 'asd', 'bfb@ss', '$2b$10$VG.JtjnBM.pgC19vq3MYwe1xMB9m9P0YdE9YjrwE5.CMwT0FPXd06', '', '23'),
(10, 'asd', 'asd@vv', '$2b$10$3tx1eLNbNqvWWbNHS3c0neilCA4uSAH/zDGmWahkdN0t/zuGmmQS.', 'BGD', 'sd'),
(11, 'asd', 'asd@asd', '$2b$10$6s1wha5yJ2CulWFu7j6nw.b2XKnd2qhO.I9ZK7XnB9z34wD8L793q', 'BGD', '23'),
(14, 'asd', 'asd@asdvv', '$2b$10$OAt8zCVIqCcFFuFiFWIcUOrcsW/xLc4SRyNPTzFi6to5FuBp2tSha', 'BGD', '23'),
(16, 'asd', 'asd@asdvvv', '$2b$10$XAXZNeiDM80UBzFXogPONepjcw1CTdEGfPZUXQQrQAVgd5mScceXi', 'BGD', '23'),
(17, 'asd', 'vdv@sdf', '$2b$10$CJB.TW/ueM72XZUc29C2ROdi234Z1jmETgTKaiHHj.MEqt6OkbmQu', 'AUS', 'sdf'),
(18, 'asd', 'asd@as', '$2b$10$8NHi7IqQTsQ.wRiuhY58LONVwcqTM37giwpR3y7JIVGusadUMoRVG', 'BGD', 'asd'),
(19, 'asd', 'm@m', '$2b$10$oUzrfaAfnXOgGZ5v4f1f3.URYXfTESl8apkDnszyI3e/tYvApOxyy', 'BGD', 'asd');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `history_id` (`history_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `parameters_id` (`parameters_id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `parameters`
--
ALTER TABLE `parameters`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `parameters`
--
ALTER TABLE `parameters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`history_id`) REFERENCES `history` (`id`),
  ADD CONSTRAINT `cars_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cars_ibfk_3` FOREIGN KEY (`parameters_id`) REFERENCES `parameters` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

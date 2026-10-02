<?php
/**
 * MEMOEDJA Database Connection Helper (PDO)
 * Sederhana, aman dengan Prepared Statements, dan kebal SQL Injection.
 */

require_once __DIR__ . '/config.php';

function getDbConnection()
{
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
        ];

        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // Log error ke server log tanpa mengekspos password ke pengunjung
        error_log("Database Connection Error: " . $e->getMessage());
        return null;
    }
}

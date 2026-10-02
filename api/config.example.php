<?php
/**
 * MEMOEDJA E-Commerce Backend Configuration Template
 * Salin file ini menjadi 'config.php' di server cPanel Anda.
 * JANGAN PERNAH commit 'config.php' yang berisi kredensial asli ke Git.
 */

// 1. Database MySQL cPanel
define('DB_HOST', 'localhost');
define('DB_NAME', 'memoedja_db');
define('DB_USER', 'memoedja_db_user');
define('DB_PASS', 'GANTI_DENGAN_PASSWORD_DATABASE_ANDA');

// 2. Biteship Logistics API (https://biteship.com/id/harga)
define('BITESHIP_API_KEY', 'biteship_test.xxxxxxxxxxxxxxxxxxxxxxxxxxxx');
define('BITESHIP_ORIGIN_AREA_ID', 'IDNP11IDNC243IDND1613IDZ12190'); // Senopati, Kebayoran Baru, Jaksel

// 3. Midtrans Payment Gateway
define('MIDTRANS_SERVER_KEY', 'SB-Mid-server-xxxxxxxxxxxxxxxxxxxxxxxx');
define('MIDTRANS_CLIENT_KEY', 'SB-Mid-client-xxxxxxxxxxxxxxxxxxxxxxxx');
define('MIDTRANS_IS_PRODUCTION', false); // true jika sudah go-live

// 4. Pengaturan Keamanan CORS
$allowed_origins = [
    'https://memoedja.com',
    'https://www.memoedja.com',
    'http://localhost:5173'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: https://memoedja.com");
}

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

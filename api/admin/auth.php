<?php
/**
 * Endpoint: Autentikasi Admin & Verifikasi Role Bertingkat
 * Method: POST /api/admin/auth.php
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

$action = $data['action'] ?? 'login';

// 1. Akun Default Tim Memoedja (Bisa langsung digunakan di localhost/demo)
$defaultAccounts = [
    'ken@memoedja.com' => [
        'id' => 1,
        'name' => 'Ken Koesumo',
        'email' => 'ken@memoedja.com',
        'role' => 'SUPER_ADMIN',
        'title' => 'Creative Director / Owner'
    ],
    'aristo@memoedja.com' => [
        'id' => 2,
        'name' => 'Aristo Rafif',
        'email' => 'aristo@memoedja.com',
        'role' => 'FINANCE',
        'title' => 'Chief Financial Officer'
    ],
    'gustaviano@memoedja.com' => [
        'id' => 3,
        'name' => 'Gustaviano Victor',
        'email' => 'gustaviano@memoedja.com',
        'role' => 'OPERATIONS',
        'title' => 'Chief Operating Officer'
    ],
    'farra@memoedja.com' => [
        'id' => 4,
        'name' => 'Farra Meilia',
        'email' => 'farra@memoedja.com',
        'role' => 'STAFF',
        'title' => 'Lead Designer'
    ]
];

if ($action === 'login') {
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');

    // Cek di MySQL jika database aktif
    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `email` = :email AND `is_active` = 1 LIMIT 1");
            $stmt->execute([':email' => $email]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                echo json_encode([
                    'success' => true,
                    'user' => [
                        'id' => $user['id'],
                        'name' => $user['name'],
                        'email' => $user['email'],
                        'role' => $user['role'],
                        'title' => $user['role']
                    ],
                    'token' => 'memoedja-token-' . bin2hex(random_bytes(16))
                ]);
                exit;
            }
        } catch (Exception $e) {
            error_log("Auth DB error: " . $e->getMessage());
        }
    }

    // Fallback: Default Demo Login (Password: admin123)
    if (isset($defaultAccounts[$email]) && ($password === 'admin123' || $password === 'memoedja')) {
        echo json_encode([
            'success' => true,
            'user' => $defaultAccounts[$email],
            'token' => 'memoedja-demo-token-' . bin2hex(random_bytes(16))
        ]);
        exit;
    }

    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Email atau kata sandi tidak valid. (Demo: ken@memoedja.com / admin123)'
    ]);
    exit;
}

if ($action === 'list_users') {
    // Ambil daftar staff untuk Super Admin
    echo json_encode([
        'success' => true,
        'users' => array_values($defaultAccounts)
    ]);
    exit;
}

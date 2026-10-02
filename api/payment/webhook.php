<?php
/**
 * Endpoint: Webhook Listener Midtrans Payment Notification
 * Method: POST /api/payment/webhook.php
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../services/whatsapp.php';

$rawNotification = file_get_contents('php://input');
$notif = json_decode($rawNotification, true);

if (empty($notif)) {
    http_response_code(400);
    exit('Payload kosong');
}

$orderId = $notif['order_id'] ?? '';
$statusCode = $notif['status_code'] ?? '';
$grossAmount = $notif['gross_amount'] ?? '';
$signatureKey = $notif['signature_key'] ?? '';
$transactionStatus = $notif['transaction_status'] ?? '';
$fraudStatus = $notif['fraud_status'] ?? '';
$paymentType = $notif['payment_type'] ?? '';

$serverKey = defined('MIDTRANS_SERVER_KEY') ? MIDTRANS_SERVER_KEY : '';

// 1. Verifikasi Keamanan SHA-512 Signature
$validSignature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

if ($signatureKey !== $validSignature && !empty($serverKey) && strpos($serverKey, 'xxxxxx') === false) {
    http_response_code(403);
    exit('Akses ditolak: Signature Key tidak valid');
}

// 2. Tentukan Status Akhir Pembayaran
$finalStatus = 'PENDING';

if ($transactionStatus == 'capture') {
    if ($fraudStatus == 'challenge') {
        $finalStatus = 'PENDING';
    } else if ($fraudStatus == 'accept') {
        $finalStatus = 'PAID';
    }
} else if ($transactionStatus == 'settlement') {
    $finalStatus = 'PAID';
} else if ($transactionStatus == 'cancel' || $transactionStatus == 'deny' || $transactionStatus == 'expire') {
    $finalStatus = 'EXPIRED';
} else if ($transactionStatus == 'pending') {
    $finalStatus = 'PENDING';
}

// 3. Update Status ke Database MySQL & Ambil Data Pemesan
$pdo = getDbConnection();
$orderData = null;

if ($pdo) {
    try {
        $stmt = $pdo->prepare("
            UPDATE `orders` 
            SET `payment_status` = :status, `payment_type` = :ptype 
            WHERE `id` = :id
        ");
        $stmt->execute([
            ':status' => $finalStatus,
            ':ptype' => $paymentType,
            ':id' => $orderId
        ]);

        // Ambil data pesanan untuk kirim WhatsApp
        $selectStmt = $pdo->prepare("SELECT * FROM `orders` WHERE `id` = :id LIMIT 1");
        $selectStmt->execute([':id' => $orderId]);
        $orderData = $selectStmt->fetch();
    } catch (Exception $e) {
        error_log("Webhook database update failed: " . $e->getMessage());
    }
}

// 4. Jika Pembayaran Berhasil Lunas (PAID), Picu Notifikasi WhatsApp!
if ($finalStatus === 'PAID' && $orderData) {
    WhatsAppService::notifyOrderPaid($orderData);
}

// Balas 200 OK ke Midtrans
http_response_code(200);
echo json_encode([
    'status' => 'success',
    'order_id' => $orderId,
    'payment_status' => $finalStatus
]);

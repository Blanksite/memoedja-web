<?php
/**
 * Endpoint: Pembuatan Transaksi & Permintaan Snap Token Midtrans
 * Method: POST /api/payment/token.php
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

$customer = $data['customer'] ?? [];
$shipping = $data['shipping'] ?? [];
$items = $data['items'] ?? [];

if (empty($customer['name']) || empty($customer['phone']) || empty($items)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Data pembeli atau garmen tidak lengkap']);
    exit;
}

// 1. Buat ID Pesanan Unik
$orderId = 'MMDJ-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5));

// 2. Hitung Ulang Subtotal & Ongkir di Sisi Server (Zero Trust)
$subtotal = 0;
$itemDetails = [];
$itemsSummaryList = [];

foreach ($items as $it) {
    $price = intval($it['price'] ?? 0);
    $qty = max(1, intval($it['quantity'] ?? 1));
    $name = substr($it['name'] ?? 'Garment', 0, 50);
    $size = $it['size'] ?? 'M';

    $subtotal += ($price * $qty);
    $itemDetails[] = [
        'id' => $it['id'] ?? 'PROD',
        'price' => $price,
        'quantity' => $qty,
        'name' => "{$name} (Size {$size})"
    ];
    $itemsSummaryList[] = "{$name} ({$size} x{$qty})";
}

$shippingCost = intval($shipping['price'] ?? 0);
if ($shippingCost > 0) {
    $itemDetails[] = [
        'id' => 'SHIPPING',
        'price' => $shippingCost,
        'quantity' => 1,
        'name' => "Ongkir " . ($shipping['courier_name'] ?? 'Kurir') . " " . ($shipping['courier_service'] ?? '')
    ];
}

$grossAmount = $subtotal + $shippingCost;

// 3. Simpan Pesanan ke Database MySQL jika tersedia
$pdo = getDbConnection();
if ($pdo) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO `orders` (
                `id`, `customer_name`, `customer_email`, `customer_phone`,
                `address_detail`, `destination_area_id`, `courier_name`, `courier_service`,
                `shipping_cost`, `subtotal_amount`, `total_amount`, `payment_status`
            ) VALUES (
                :id, :name, :email, :phone,
                :address, :area_id, :courier_name, :courier_service,
                :shipping_cost, :subtotal, :total, 'PENDING'
            )
        ");

        $stmt->execute([
            ':id' => $orderId,
            ':name' => $customer['name'],
            ':email' => $customer['email'] ?? '-',
            ':phone' => $customer['phone'],
            ':address' => $customer['address'] ?? '-',
            ':area_id' => $shipping['destination_area_id'] ?? '-',
            ':courier_name' => $shipping['courier_name'] ?? 'JNE',
            ':courier_service' => $shipping['courier_service'] ?? 'REG',
            ':shipping_cost' => $shippingCost,
            ':subtotal' => $subtotal,
            ':total' => $grossAmount
        ]);

        // Simpan Item Detail
        $itemStmt = $pdo->prepare("
            INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `size`, `quantity`, `price`)
            VALUES (:order_id, :prod_id, :name, :size, :qty, :price)
        ");

        foreach ($items as $it) {
            $itemStmt->execute([
                ':order_id' => $orderId,
                ':prod_id' => $it['id'] ?? 'PROD',
                ':name' => $it['name'] ?? 'Product',
                ':size' => $it['size'] ?? 'M',
                ':qty' => max(1, intval($it['quantity'] ?? 1)),
                ':price' => intval($it['price'] ?? 0)
            ]);
        }
    } catch (Exception $e) {
        error_log("Failed to insert order: " . $e->getMessage());
    }
}

// 4. Minta Snap Token ke Midtrans
$serverKey = defined('MIDTRANS_SERVER_KEY') ? MIDTRANS_SERVER_KEY : '';
$isProduction = defined('MIDTRANS_IS_PRODUCTION') ? MIDTRANS_IS_PRODUCTION : false;

// Mock Snap Token jika server key belum aktif
if (empty($serverKey) || strpos($serverKey, 'xxxxxx') !== false) {
    echo json_encode([
        'success' => true,
        'mode' => 'mock',
        'order_id' => $orderId,
        'token' => 'mock-snap-token-' . uniqid(),
        'redirect_url' => 'https://simulator.sandbox.midtrans.com',
        'gross_amount' => $grossAmount
    ]);
    exit;
}

$snapEndpoint = $isProduction
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

$payloadMidtrans = [
    'transaction_details' => [
        'order_id' => $orderId,
        'gross_amount' => $grossAmount
    ],
    'item_details' => $itemDetails,
    'customer_details' => [
        'first_name' => $customer['name'],
        'email' => $customer['email'] ?? 'customer@memoedja.com',
        'phone' => $customer['phone'],
        'billing_address' => [
            'address' => $customer['address'] ?? '-'
        ]
    ]
];

$authString = base64_encode($serverKey . ':');

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $snapEndpoint,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payloadMidtrans),
    CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => [
        "Authorization: Basic $authString",
        "Content-Type: application/json",
        "Accept: application/json"
    ]
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$resData = json_decode($response, true);

if ($httpCode === 201 && !empty($resData['token'])) {
    // Update snap_token di DB jika pdo aktif
    if ($pdo) {
        $updateStmt = $pdo->prepare("UPDATE `orders` SET `snap_token` = :token WHERE `id` = :id");
        $updateStmt->execute([':token' => $resData['token'], ':id' => $orderId]);
    }

    echo json_encode([
        'success' => true,
        'order_id' => $orderId,
        'token' => $resData['token'],
        'redirect_url' => $resData['redirect_url'] ?? '',
        'gross_amount' => $grossAmount
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal meminta Snap Token ke Midtrans',
        'debug' => $resData
    ]);
}

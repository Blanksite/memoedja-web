<?php
/**
 * Endpoint: Manajemen Pesanan Admin (List, Filter, Update Resi)
 * Method: GET / POST /api/admin/orders.php
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../services/whatsapp.php';

$method = $_SERVER['REQUEST_METHOD'];

// Sample Orders untuk Demo / Localhost jika MySQL belum diisi
$mockOrders = [
    [
        'id' => 'MMDJ-20261001-9821A',
        'customer_name' => 'Dimas Arya',
        'customer_email' => 'dimas.arya@gmail.com',
        'customer_phone' => '081288992211',
        'address_detail' => 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190',
        'courier_name' => 'JNE',
        'courier_service' => 'YES',
        'shipping_cost' => 24000,
        'subtotal_amount' => 1388000,
        'total_amount' => 1412000,
        'payment_status' => 'PAID',
        'fulfillment_status' => 'PACKING',
        'waybill_number' => null,
        'created_at' => date('Y-m-d H:i:s', strtotime('-2 hours')),
        'items' => [
            ['name' => 'Selvedge Denim 13 Oz Straight Jeans', 'size' => '32', 'quantity' => 1, 'price' => 689000],
            ['name' => 'Cotton Chore Jacket', 'size' => 'L', 'quantity' => 1, 'price' => 699000]
        ]
    ],
    [
        'id' => 'MMDJ-20261001-7712B',
        'customer_name' => 'Nathalia Siregar',
        'customer_email' => 'nathalia@siregar.id',
        'customer_phone' => '081399881122',
        'address_detail' => 'Jl. Riau No. 12, Bandung, Jawa Barat 40115',
        'courier_name' => 'SiCepat',
        'courier_service' => 'SIUNTUNG',
        'shipping_cost' => 15000,
        'subtotal_amount' => 749000,
        'total_amount' => 764000,
        'payment_status' => 'PAID',
        'fulfillment_status' => 'SHIPPED',
        'waybill_number' => 'SCP-9928172641',
        'created_at' => date('Y-m-d H:i:s', strtotime('-1 day')),
        'items' => [
            ['name' => 'Denim 15 Oz Bootcut Jeans', 'size' => '30', 'quantity' => 1, 'price' => 749000]
        ]
    ],
    [
        'id' => 'MMDJ-20261001-4451C',
        'customer_name' => 'Budi Santoso',
        'customer_email' => 'budi.santoso@yahoo.com',
        'customer_phone' => '085711223344',
        'address_detail' => 'Jl. Darmo No. 88, Wonokromo, Surabaya 60241',
        'courier_name' => 'J&T Express',
        'courier_service' => 'EZ',
        'shipping_cost' => 18000,
        'subtotal_amount' => 329000,
        'total_amount' => 347000,
        'payment_status' => 'PENDING',
        'fulfillment_status' => 'UNFULFILLED',
        'waybill_number' => null,
        'created_at' => date('Y-m-d H:i:s', strtotime('-3 hours')),
        'items' => [
            ['name' => 'Cotton Combed Henley Shirt', 'size' => 'XL', 'quantity' => 1, 'price' => 329000]
        ]
    ]
];

// 1. GET: Ambil Daftar Pesanan
if ($method === 'GET') {
    $statusFilter = $_GET['status'] ?? 'ALL';
    $pdo = getDbConnection();

    if ($pdo) {
        try {
            $sql = "SELECT * FROM `orders`";
            if ($statusFilter !== 'ALL') {
                $sql .= " WHERE `payment_status` = :status";
            }
            $sql .= " ORDER BY `created_at` DESC LIMIT 100";

            $stmt = $pdo->prepare($sql);
            if ($statusFilter !== 'ALL') {
                $stmt->execute([':status' => $statusFilter]);
            } else {
                $stmt->execute();
            }

            $orders = $stmt->fetchAll();

            // Lengkapi rincian item
            foreach ($orders as &$ord) {
                $itemStmt = $pdo->prepare("SELECT * FROM `order_items` WHERE `order_id` = :oid");
                $itemStmt->execute([':oid' => $ord['id']]);
                $ord['items'] = $itemStmt->fetchAll();
            }

            echo json_encode(['success' => true, 'orders' => $orders]);
            exit;
        } catch (Exception $e) {
            error_log("Orders fetch error: " . $e->getMessage());
        }
    }

    // Fallback Mock
    $filtered = $mockOrders;
    if ($statusFilter !== 'ALL') {
        $filtered = array_values(array_filter($mockOrders, function ($o) use ($statusFilter) {
            return $o['payment_status'] === $statusFilter;
        }));
    }

    echo json_encode([
        'success' => true,
        'mode' => 'mock',
        'orders' => $filtered
    ]);
    exit;
}

// 2. POST: Update Resi Kurir / Status Pengiriman
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    $orderId = $data['order_id'] ?? '';
    $waybill = trim($data['waybill_number'] ?? '');
    $fulfillment = $data['fulfillment_status'] ?? 'SHIPPED';
    $sendWa = !empty($data['send_whatsapp']);

    if (empty($orderId)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'order_id wajib diisi']);
        exit;
    }

    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                UPDATE `orders` 
                SET `waybill_number` = :waybill, `fulfillment_status` = :fulfillment 
                WHERE `id` = :id
            ");
            $stmt->execute([
                ':waybill' => $waybill,
                ':fulfillment' => $fulfillment,
                ':id' => $orderId
            ]);

            if ($sendWa && !empty($waybill)) {
                $ordStmt = $pdo->prepare("SELECT * FROM `orders` WHERE `id` = :id LIMIT 1");
                $ordStmt->execute([':id' => $orderId]);
                $order = $ordStmt->fetch();
                if ($order) {
                    WhatsAppService::notifyTrackingNumber($order, $waybill);
                }
            }
        } catch (Exception $e) {
            error_log("Update order waybill failed: " . $e->getMessage());
        }
    }

    echo json_encode([
        'success' => true,
        'message' => 'Nomor resi berhasil diperbarui' . ($sendWa ? ' & notifikasi WhatsApp dikirim' : '')
    ]);
    exit;
}

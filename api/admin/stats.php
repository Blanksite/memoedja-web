<?php
/**
 * Endpoint: Ringkasan Metrik Finansial & Operasional Dashboard
 * Method: GET /api/admin/stats.php
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';

$pdo = getDbConnection();

if ($pdo) {
    try {
        // 1. Total Pendapatan Lunas
        $revStmt = $pdo->query("SELECT SUM(total_amount) as total_revenue, COUNT(*) as paid_orders FROM `orders` WHERE `payment_status` = 'PAID'");
        $rev = $revStmt->fetch();
        $totalRevenue = floatval($rev['total_revenue'] ?? 0);
        $paidCount = intval($rev['paid_orders'] ?? 0);

        // 2. Pending Orders
        $penStmt = $pdo->query("SELECT COUNT(*) as pending_count FROM `orders` WHERE `payment_status` = 'PENDING'");
        $pendingCount = intval($penStmt->fetch()['pending_count'] ?? 0);

        // 3. AOV (Average Order Value)
        $aov = $paidCount > 0 ? round($totalRevenue / $paidCount) : 0;

        echo json_encode([
            'success' => true,
            'stats' => [
                'total_revenue' => $totalRevenue,
                'total_revenue_formatted' => 'Rp ' . number_format($totalRevenue, 0, ',', '.'),
                'paid_orders_count' => $paidCount,
                'pending_orders_count' => $pendingCount,
                'average_order_value' => $aov,
                'average_order_value_formatted' => 'Rp ' . number_format($aov, 0, ',', '.')
            ]
        ]);
        exit;
    } catch (Exception $e) {
        error_log("Stats fetch failed: " . $e->getMessage());
    }
}

// Fallback Mock Stats untuk Localhost / Demo
echo json_encode([
    'success' => true,
    'mode' => 'mock',
    'stats' => [
        'total_revenue' => 2176000,
        'total_revenue_formatted' => 'Rp 2.176.000',
        'paid_orders_count' => 2,
        'pending_orders_count' => 1,
        'average_order_value' => 1088000,
        'average_order_value_formatted' => 'Rp 1.088.000'
    ]
]);

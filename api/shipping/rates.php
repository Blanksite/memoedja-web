<?php
/**
 * Endpoint: Cek Ongkos Kirim Real-Time Kurir via Biteship API
 * Method: POST /api/shipping/rates.php
 */

require_once __DIR__ . '/../config.php';

$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true);

$destinationAreaId = $payload['destination_area_id'] ?? '';
$totalWeight = intval($payload['weight'] ?? 1000); // dalam gram (default 1kg)
$couriers = $payload['couriers'] ?? 'jne,sicepat,jnt';

if (empty($destinationAreaId)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'destination_area_id wajib diisi']);
    exit;
}

$apiKey = defined('BITESHIP_API_KEY') ? BITESHIP_API_KEY : '';
$originAreaId = defined('BITESHIP_ORIGIN_AREA_ID') ? BITESHIP_ORIGIN_AREA_ID : 'IDNP11IDNC243IDND1613IDZ12190';

// Mock response jika API key belum aktif
if (empty($apiKey) || strpos($apiKey, 'xxxxxx') !== false) {
    $mockRates = [
        [
            'courier_name' => 'JNE',
            'courier_service_name' => 'REG (Reguler)',
            'courier_service_code' => 'reg',
            'duration' => '1 - 2 hari',
            'price' => 14000,
            'description' => 'Layanan reguler terpercaya seluruh Indonesia'
        ],
        [
            'courier_name' => 'JNE',
            'courier_service_name' => 'YES (Yakin Esok Sampai)',
            'courier_service_code' => 'yes',
            'duration' => '1 hari (Besok Sampai)',
            'price' => 24000,
            'description' => 'Pengiriman kilat prioritas'
        ],
        [
            'courier_name' => 'SiCepat',
            'courier_service_name' => 'SIUNTUNG',
            'courier_service_code' => 'siuntung',
            'duration' => '1 - 2 hari',
            'price' => 13500,
            'description' => 'Cepat dan ekonomis'
        ],
        [
            'courier_name' => 'J&T Express',
            'courier_service_name' => 'EZ',
            'courier_service_code' => 'ez',
            'duration' => '2 - 3 hari',
            'price' => 15000,
            'description' => 'Jangkauan luas hingga pelosok'
        ]
    ];

    echo json_encode([
        'success' => true,
        'mode' => 'mock',
        'pricing' => $mockRates
    ]);
    exit;
}

// Request ke Biteship API
$requestBody = [
    'origin_area_id' => $originAreaId,
    'destination_area_id' => $destinationAreaId,
    'couriers' => $couriers,
    'items' => [
        [
            'name' => 'Memoedja Garment Package',
            'value' => 650000,
            'weight' => max(100, $totalWeight),
            'quantity' => 1
        ]
    ]
];

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => 'https://api.biteship.com/v1/rates/couriers',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($requestBody),
    CURLOPT_TIMEOUT => 12,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer $apiKey",
        "Content-Type: application/json"
    ]
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);

if ($err) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Gagal meminta tarif ke Biteship']);
    exit;
}

$data = json_decode($response, true);
$pricing = $data['pricing'] ?? [];

echo json_encode([
    'success' => $httpCode === 200,
    'pricing' => $pricing
]);

<?php
/**
 * Endpoint: Pencarian Area / Kecamatan Domestik via Biteship API
 * Method: GET /api/shipping/areas.php?query=kebayoran
 */

require_once __DIR__ . '/../config.php';

$query = trim($_GET['query'] ?? $_GET['input'] ?? '');

if (strlen($query) < 3) {
    echo json_encode([
        'success' => false,
        'message' => 'Ketik minimal 3 karakter untuk mencari area',
        'areas' => []
    ]);
    exit;
}

$apiKey = defined('BITESHIP_API_KEY') ? BITESHIP_API_KEY : '';

// Jika API key belum diisi atau mode demo
if (empty($apiKey) || strpos($apiKey, 'xxxxxx') !== false) {
    // Mock response untuk testing lokal
    $sampleAreas = [
        [
            'id' => 'IDNP11IDNC243IDND1613IDZ12190',
            'name' => 'Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190',
            'country_name' => 'Indonesia',
            'postal_code' => 12190
        ],
        [
            'id' => 'IDNP11IDNC243IDND1614IDZ12240',
            'name' => 'Kebayoran Lama, Jakarta Selatan, DKI Jakarta 12240',
            'country_name' => 'Indonesia',
            'postal_code' => 12240
        ],
        [
            'id' => 'IDNP15IDNC245IDND1615IDZ60241',
            'name' => 'Wonokromo, Surabaya, Jawa Timur 60241',
            'country_name' => 'Indonesia',
            'postal_code' => 60241
        ],
        [
            'id' => 'IDNP13IDNC244IDND1616IDZ40115',
            'name' => 'Coblong, Bandung, Jawa Barat 40115',
            'country_name' => 'Indonesia',
            'postal_code' => 40115
        ]
    ];

    $filtered = array_filter($sampleAreas, function ($a) use ($query) {
        return stripos($a['name'], $query) !== false;
    });

    echo json_encode([
        'success' => true,
        'mode' => 'mock',
        'areas' => array_values($filtered)
    ]);
    exit;
}

// Request langsung ke Biteship API
$url = 'https://api.biteship.com/v1/maps/areas?countries=ID&input=' . urlencode($query) . '&type=single';

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
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
    echo json_encode(['success' => false, 'message' => 'Gagal terhubung ke Biteship API']);
    exit;
}

$data = json_decode($response, true);
$areas = $data['areas'] ?? [];

echo json_encode([
    'success' => $httpCode === 200,
    'areas' => $areas
]);

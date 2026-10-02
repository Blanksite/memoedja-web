<?php
/**
 * MEMOEDJA WhatsApp Concierge Notification Service
 * Mendukung Fonnte, Wablas, dan mode Mock/Log untuk pengujian lokal.
 */

require_once __DIR__ . '/../config.php';

class WhatsAppService
{
    /**
     * Kirim pesan teks WhatsApp ke nomor tujuan
     * 
     * @param string $phone Nomor HP penerima (misal: 08123456789 atau 628123456789)
     * @param string $message Teks pesan yang dikirim
     * @return array Status pengiriman ['success' => bool, 'response' => mixed]
     */
    public static function send($phone, $message)
    {
        // 1. Normalisasi nomor telepon ke format internasional 62xxx
        $cleanPhone = preg_replace('/[^0-9]/', '', $phone);
        if (substr($cleanPhone, 0, 1) === '0') {
            $cleanPhone = '62' . substr($cleanPhone, 1);
        } elseif (substr($cleanPhone, 0, 2) !== '62') {
            $cleanPhone = '62' . $cleanPhone;
        }

        $provider = defined('WA_GATEWAY_PROVIDER') ? WA_GATEWAY_PROVIDER : 'mock';
        $token = defined('WA_API_TOKEN') ? WA_API_TOKEN : '';

        // Mode Mock / Fallback jika belum mengisi token di config.php
        if (empty($token) || $provider === 'mock') {
            self::logMockMessage($cleanPhone, $message);
            return [
                'success' => true,
                'provider' => 'mock',
                'message' => 'Simulasi WhatsApp berhasil dicatat ke api/logs/whatsapp.log'
            ];
        }

        // Mode Fonnte Gateway (https://fonnte.com)
        if ($provider === 'fonnte') {
            return self::sendViaFonnte($cleanPhone, $message, $token);
        }

        // Mode Wablas Gateway (https://wablas.com)
        if ($provider === 'wablas') {
            return self::sendViaWablas($cleanPhone, $message, $token);
        }

        return ['success' => false, 'message' => 'Provider WhatsApp tidak dikenali'];
    }

    /**
     * Kirim pesan notifikasi pembayaran sukses (Order Paid)
     */
    public static function notifyOrderPaid($order)
    {
        $orderId = $order['id'] ?? 'MMDJ-INV';
        $customerName = $order['customer_name'] ?? 'Pelanggan';
        $phone = $order['customer_phone'] ?? '';
        $courier = strtoupper($order['courier_name'] ?? 'JNE') . ' (' . ($order['courier_service'] ?? 'Reguler') . ')';
        $totalFormatted = number_format($order['total_amount'] ?? 0, 0, ',', '.');
        $address = $order['address_detail'] ?? '-';
        $itemsText = $order['items_summary'] ?? 'Koleksi Memoedja Tarombo';

        $msg = "MEMOEDJA ATELIER\n";
        $msg .= "\"Honor confers a crown\"\n";
        $msg .= "----------------------------------------\n\n";
        $msg .= "Yth. Bapak/Ibu *{$customerName}*,\n\n";
        $msg .= "Pembayaran pesanan Anda *#{$orderId}* telah kami terima secara resmi.\n\n";
        $msg .= "📦 *Ringkasan Pesanan:*\n";
        $msg .= "• {$itemsText}\n";
        $msg .= "• Kurir Pilihan: {$courier}\n";
        $msg .= "• Total Lunas: *Rp {$totalFormatted}*\n\n";
        $msg .= "📍 *Alamat Pengiriman:*\n";
        $msg .= "{$address}\n\n";
        $msg .= "Garmen pesanan Anda saat ini sedang dalam proses inspeksi kualitas & pengemasan oleh tim atelier kami. Nomor resi pengiriman akan kami informasikan melalui pesan ini begitu paket diserahkan ke pihak kurir.\n\n";
        $msg .= "Terima kasih atas apresiasi Anda terhadap kriya dan narasi Nusantara.\n";
        $msg .= "----------------------------------------\n";
        $msg .= "Maison Memoedja — Senopati, Jakarta\n";
        $msg .= "https://memoedja.com";

        return self::send($phone, $msg);
    }

    /**
     * Kirim pesan notifikasi nomor resi pengiriman (Shipped / Waybill Issued)
     */
    public static function notifyTrackingNumber($order, $waybillNumber, $trackingUrl = '')
    {
        $orderId = $order['id'] ?? 'MMDJ-INV';
        $customerName = $order['customer_name'] ?? 'Pelanggan';
        $phone = $order['customer_phone'] ?? '';
        $courier = strtoupper($order['courier_name'] ?? 'KURIR');

        $msg = "MEMOEDJA DISPATCH NOTICE\n";
        $msg .= "----------------------------------------\n\n";
        $msg .= "Yth. *{$customerName}*,\n\n";
        $msg .= "Pesanan Anda *#{$orderId}* telah diserahkan kepada pihak ekspedisi dan sedang dalam perjalanan menuju alamat Anda.\n\n";
        $msg .= "🚚 *Informasi Logistik:*\n";
        $msg .= "• Ekspedisi: *{$courier}*\n";
        $msg .= "• No. Resi (Waybill): *{$waybillNumber}*\n";
        if (!empty($trackingUrl)) {
            $msg .= "• Pantau Pengiriman: {$trackingUrl}\n";
        }
        $msg .= "\nMohon pastikan ada penerima di alamat tujuan. Jika ada kendala penerimaan, silakan balas pesan ini untuk terhubung dengan tim concierge kami.\n\n";
        $msg .= "Salam hangat,\n";
        $msg .= "Memoedja Atelier Fulfillment Team";

        return self::send($phone, $msg);
    }

    /**
     * Provider: Fonnte (https://api.fonnte.com/send)
     */
    private static function sendViaFonnte($phone, $message, $token)
    {
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => [
                'target' => $phone,
                'message' => $message,
                'countryCode' => '62'
            ],
            CURLOPT_HTTPHEADER => [
                "Authorization: $token"
            ]
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        if ($err) {
            return ['success' => false, 'error' => $err];
        }

        $result = json_decode($response, true);
        return ['success' => ($result['status'] ?? false) == true, 'response' => $result];
    }

    /**
     * Provider: Wablas (https://bdg.wablas.com/api/send-message)
     */
    private static function sendViaWablas($phone, $message, $token)
    {
        $domain = defined('WA_WABLAS_DOMAIN') ? WA_WABLAS_DOMAIN : 'https://bdg.wablas.com';
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => rtrim($domain, '/') . '/api/send-message',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query([
                'phone' => $phone,
                'message' => $message
            ]),
            CURLOPT_HTTPHEADER => [
                "Authorization: $token"
            ]
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        if ($err) {
            return ['success' => false, 'error' => $err];
        }

        $result = json_decode($response, true);
        return ['success' => ($result['status'] ?? false) == true, 'response' => $result];
    }

    /**
     * Simpan pesan ke log file jika mode testing
     */
    private static function logMockMessage($phone, $message)
    {
        $logDir = __DIR__ . '/../logs';
        if (!is_dir($logDir)) {
            @mkdir($logDir, 0755, true);
        }
        $logFile = $logDir . '/whatsapp.log';
        $entry = "[" . date('Y-m-d H:i:s') . "] TO: {$phone}\n{$message}\n" . str_repeat('=', 50) . "\n\n";
        @file_put_contents($logFile, $entry, FILE_APPEND);
    }
}

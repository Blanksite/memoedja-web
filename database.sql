-- ====================================================
-- SKEMA DATABASE SEDERHANA MEMOEDJA E-COMMERCE
-- Untuk di-import langsung di phpMyAdmin cPanel
-- ====================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Tabel Pesanan (Orders)
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'Contoh: MMDJ-20261002-1234',
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_email` VARCHAR(100) NOT NULL,
  `customer_phone` VARCHAR(25) NOT NULL,
  `address_detail` TEXT NOT NULL,
  `destination_area_id` VARCHAR(100) NOT NULL,
  `courier_name` VARCHAR(50) NOT NULL COMMENT 'JNE, SiCepat, J&T',
  `courier_service` VARCHAR(50) NOT NULL COMMENT 'REG, YES, OKE',
  `shipping_cost` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `subtotal_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `total_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `snap_token` VARCHAR(100) NULL,
  `payment_type` VARCHAR(50) NULL COMMENT 'qris, bank_transfer, credit_card',
  `payment_status` ENUM('PENDING', 'PAID', 'EXPIRED', 'FAILED') NOT NULL DEFAULT 'PENDING',
  `waybill_number` VARCHAR(100) NULL COMMENT 'Nomor Resi Pengiriman',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabel Rincian Baju yang Dipesan (Order Items)
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` VARCHAR(50) NOT NULL,
  `product_id` VARCHAR(50) NOT NULL,
  `product_name` VARCHAR(150) NOT NULL,
  `size` VARCHAR(10) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `price` DECIMAL(12, 2) NOT NULL,
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

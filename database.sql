-- ====================================================
-- SKEMA DATABASE OPERASIONAL MEMOEDJA E-COMMERCE
-- Mendukung User Bertingkat (RBAC) & E-Commerce Core
-- ====================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Tabel User Staff / Pengguna Bertingkat
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('SUPER_ADMIN', 'FINANCE', 'OPERATIONS', 'STAFF') NOT NULL DEFAULT 'STAFF',
  `avatar` VARCHAR(255) NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `last_login` DATETIME NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabel Pesanan (Orders)
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
  `fulfillment_status` ENUM('UNFULFILLED', 'PACKING', 'SHIPPED', 'DELIVERED') NOT NULL DEFAULT 'UNFULFILLED',
  `waybill_number` VARCHAR(100) NULL COMMENT 'Nomor Resi Biteship / Kurir',
  `biteship_order_id` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Tabel Rincian Baju yang Dipesan (Order Items)
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

-- 4. Tabel Stok Produk
CREATE TABLE IF NOT EXISTS `product_inventory` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` VARCHAR(50) NOT NULL,
  `size` VARCHAR(10) NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `idx_product_size` (`product_id`, `size`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================
-- SEED DATA DEFAULT (Dapat langsung diuji)
-- ====================================================
INSERT INTO `users` (`name`, `email`, `password_hash`, `role`) VALUES
('Ken Koesumo', 'ken@memoedja.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'SUPER_ADMIN'),
('Aristo Rafif', 'aristo@memoedja.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'FINANCE'),
('Gustaviano Victor', 'gustaviano@memoedja.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'OPERATIONS'),
('Farra Meilia', 'farra@memoedja.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STAFF')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

SET FOREIGN_KEY_CHECKS = 1;

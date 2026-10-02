/**
 * MEMOEDJA Google Analytics 4 (GA4) E-Commerce Helper
 * Mendukung tracking standar Google Analytics untuk e-commerce fashion
 */

export const initGA = (measurementId) => {
  if (typeof window === 'undefined') return;
  const id = measurementId || localStorage.getItem('memoedja_ga_id') || 'G-XXXXXXXXXX';
  window.__GA_MEASUREMENT_ID__ = id;

  if (window.gtag) {
    window.gtag('config', id, { send_page_view: true });
  }
};

export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// 1. Lacak Kunjungan Halaman
export const trackPageView = (pagePath, pageTitle) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle
  });
};

// 2. Lacak Saat Customer Melihat Detail Garmen (View Item)
export const trackViewItem = (product) => {
  if (!product) return;
  trackEvent('view_item', {
    currency: 'IDR',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: 'Contemporary Fashion',
        price: product.price
      }
    ]
  });
};

// 3. Lacak Saat Menambahkan ke Keranjang (Add to Cart)
export const trackAddToCart = (product, size, quantity = 1) => {
  if (!product) return;
  trackEvent('add_to_cart', {
    currency: 'IDR',
    value: product.price * quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_variant: `Size ${size}`,
        price: product.price,
        quantity: quantity
      }
    ]
  });
};

// 4. Lacak Pembukaan Modal Checkout (Begin Checkout)
export const trackBeginCheckout = (items, totalValue) => {
  trackEvent('begin_checkout', {
    currency: 'IDR',
    value: totalValue,
    items: items.map((it) => ({
      item_id: it.product?.id || it.id,
      item_name: it.product?.name || it.name,
      item_variant: `Size ${it.size}`,
      price: it.product?.price || it.price,
      quantity: it.quantity
    }))
  });
};

// 5. Lacak Transaksi Lunas Berhasil (Purchase)
export const trackPurchase = (orderId, totalAmount, items, shippingCost) => {
  trackEvent('purchase', {
    transaction_id: orderId,
    value: totalAmount,
    currency: 'IDR',
    shipping: shippingCost,
    items: items.map((it) => ({
      item_id: it.product?.id || it.id,
      item_name: it.product?.name || it.name,
      item_variant: `Size ${it.size}`,
      price: it.product?.price || it.price,
      quantity: it.quantity
    }))
  });
};

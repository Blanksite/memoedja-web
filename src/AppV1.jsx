import React from 'react';
import { PRODUCTS } from './data/products';
import Navbar from './components/Navbar';
import HeroCampaign from './components/HeroCampaign';
import Manifesto from './components/Manifesto';
import BoutiqueGallery from './components/BoutiqueGallery';
// import BrandWorld from './components/BrandWorld';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import InventoryManager from './components/InventoryManager';
import SearchModal from './components/SearchModal';
import { useState } from 'react';

export default function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currency, setCurrency] = useState("IDR");

  // Add to Bag
  const handleAddToCart = (product, size, quantity = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });
    setIsCartOpen(true);
  };

  // Update Quantity
  const handleUpdateQuantity = (productId, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove
  const handleRemoveFromCart = (productId, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  // Stock Update
  const handleUpdateStock = (productId, size, newCount) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, stockPerSize: { ...p.stockPerSize, [size]: Math.max(0, newCount) } }
          : p
      )
    );
  };

  // Order Success
  const handleSuccessfulOrder = (orderedItems) => {
    setProducts((prev) => {
      const updated = [...prev];
      orderedItems.forEach((it) => {
        const pIdx = updated.findIndex((p) => p.id === it.product.id);
        if (pIdx > -1) {
          const current = updated[pIdx].stockPerSize?.[it.size] || 0;
          updated[pIdx] = {
            ...updated[pIdx],
            stockPerSize: {
              ...updated[pIdx].stockPerSize,
              [it.size]: Math.max(0, current - it.quantity)
            }
          };
        }
      });
      return updated;
    });
    setCart([]);
  };

  const totalCartUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#000000] flex flex-col font-sans">
      <Navbar
        cartCount={totalCartUnits}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenInventory={() => setIsInventoryOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
      />

      <main className="flex-1">
        {/* 1. Full-Bleed Campaign Visual */}
        <HeroCampaign />

        {/* 2. Manifesto — One Poetic Statement */}
        <Manifesto />

        {/* 3. Boutique Gallery — Images + Art Interludes */}
        <BoutiqueGallery onSelectProduct={(p) => setSelectedProduct(p)} />
      </main>

      <Footer />

      {/* === Modals & Drawers === */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onSuccessfulOrder={handleSuccessfulOrder}
      />

      <InventoryManager
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        products={products}
        onUpdateStock={handleUpdateStock}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}

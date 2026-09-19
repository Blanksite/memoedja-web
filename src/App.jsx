import React, { useState } from 'react';
import { PRODUCTS } from './data/products';
import Navbar from './components/Navbar';
import HeroCampaign from './components/HeroCampaign';
import CulturalStory from './components/CulturalStory';
import GarmentExplorer from './components/GarmentExplorer';
import ProductCatalog from './components/ProductCatalog';
import BrandPhilosophy from './components/BrandPhilosophy';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import InventoryManager from './components/InventoryManager';
import SearchModal from './components/SearchModal';

export default function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currency, setCurrency] = useState("IDR");

  // Add to Bag Handler
  const handleAddToCart = (product, size, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, size, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  // Update Item Quantity in Bag
  const handleUpdateQuantity = (productId, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove Item from Bag
  const handleRemoveFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  // Direct Stock Update from Ops Matrix
  const handleUpdateStock = (productId, size, newCount) => {
    const safeCount = Math.max(0, newCount);
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            stockPerSize: {
              ...p.stockPerSize,
              [size]: safeCount
            }
          };
        }
        return p;
      })
    );
  };

  // When order is successfully checked out and paid
  const handleSuccessfulOrder = (orderedItems, orderId) => {
    // Deduct stock from inventory
    setProducts((prev) => {
      const updated = [...prev];
      orderedItems.forEach((it) => {
        const pIndex = updated.findIndex((p) => p.id === it.product.id);
        if (pIndex > -1) {
          const current = updated[pIndex].stockPerSize?.[it.size] || 0;
          updated[pIndex] = {
            ...updated[pIndex],
            stockPerSize: {
              ...updated[pIndex].stockPerSize,
              [it.size]: Math.max(0, current - it.quantity)
            }
          };
        }
      });
      return updated;
    });

    // Clear cart
    setCart([]);
  };

  const totalCartUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121212] flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartUnits}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenInventory={() => setIsInventoryOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Experience Flow */}
      <main className="flex-1">
        {/* Dior-style Haute Editorial Hero */}
        <HeroCampaign onExploreClick={() => {}} />

        {/* Tarombo Cultural Narrative & Batak Heritage */}
        <CulturalStory />

        {/* Savoir-Faire / Atelier Garment Construction Breakdown */}
        <GarmentExplorer
          onSelectProductForModal={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* The Capsule Collection & Lookbook */}
        <ProductCatalog
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAddToCart={handleAddToCart}
        />

        {/* Brand Pillars & Founding Team */}
        <BrandPhilosophy />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-Out Drawers */}
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

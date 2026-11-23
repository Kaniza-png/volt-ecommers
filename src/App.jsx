import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { PRODUCTS } from './data/mockData';
import { INITIAL_AUCTIONS } from './data/auctionData';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CareHub from './pages/CareHub';
import About from './pages/About';
import Auctions from './pages/Auctions';
import AuctionDetail from './pages/AuctionDetail';
import Auth from './pages/Auth';
import AdminDashboard from './pages/admin/AdminDashboard';

function AppRoutes() {
  const { addToCart, totalItems } = useCart();
  const [products, setProducts] = useState(PRODUCTS);
  const [auctions, setAuctions] = useState(INITIAL_AUCTIONS);
  const [orders, setOrders] = useState([]);

  const handleAddProduct = (newProduct) => setProducts((prev) => [newProduct, ...prev]);
  const handleDeleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const handlePlaceBid = (lotId, newAmount, bidderName) => {
    setAuctions((prev) =>
      prev.map((lot) => {
        if (lot.id !== lotId) return lot;
        const newEntry = {
          id: `bid-${Date.now()}`,
          bidder: bidderName,
          amount: newAmount,
          timeAgo: 'Baru saja',
        };
        return {
          ...lot,
          currentBid: newAmount,
          totalBids: lot.totalBids + 1,
          history: [newEntry, ...lot.history],
        };
      })
    );
  };

  const handleAddAuction = (newLot) => setAuctions((prev) => [...prev, newLot]);
  const handleCloseAuction = (lotId) => {
    setAuctions((prev) =>
      prev.map((lot) =>
        lot.id === lotId ? { ...lot, status: 'SELESAI', badgeText: 'SELESAI' } : lot
      )
    );
  };

  const handleCreateOrder = (orderData) => {
    setOrders((prev) => [{ ...orderData, status: 'Menunggu Pembayaran' }, ...prev]);
  };

  const handleUpdateOrderStatus = (orderNumber, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderNumber === orderNumber ? { ...o, status } : o))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#181818]">
      <AnnouncementBar />
      <Navbar cartCount={totalItems} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home products={products} onQuickAdd={addToCart} />} />
          <Route path="/produk" element={<Catalog products={products} onQuickAdd={addToCart} />} />
          <Route path="/kategori/:slug" element={<Catalog products={products} onQuickAdd={addToCart} />} />
          <Route path="/promo" element={<Catalog products={products} isPromoPage onQuickAdd={addToCart} />} />
          <Route path="/produk/:slug" element={<ProductDetail products={products} onAddToCart={addToCart} />} />

          {/* Fitur Lelang */}
          <Route path="/lelang" element={<Auctions auctions={auctions} />} />
          <Route path="/lelang/:slug" element={<AuctionDetail auctions={auctions} onPlaceBid={handlePlaceBid} />} />

          {/* Keranjang & Checkout */}
          <Route path="/keranjang" element={<Cart />} />
          <Route path="/checkout" element={<Checkout onOrderComplete={handleCreateOrder} />} />

          {/* Autentikasi & Dashboard Admin */}
          <Route path="/akun" element={<Auth orders={orders} />} />
          <Route
            path="/admin"
            element={
              <AdminDashboard
                products={products}
                onAddProduct={handleAddProduct}
                onDeleteProduct={handleDeleteProduct}
                auctions={auctions}
                onAddAuction={handleAddAuction}
                onCloseAuction={handleCloseAuction}
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            }
          />

          {/* Pusat Bantuan & Tentang VOLT */}
          <Route path="/bantuan" element={<CareHub section="hub" />} />
          <Route path="/bantuan/pengiriman-retur" element={<CareHub section="pengiriman" />} />
          <Route path="/bantuan/garansi" element={<CareHub section="garansi" />} />
          <Route path="/bantuan/faq" element={<CareHub section="faq" />} />
          <Route path="/hubungi-kami" element={<CareHub section="kontak" />} />
          <Route path="/tentang" element={<About section="tentang" />} />
          <Route path="/tentang/cerita-kami" element={<About section="cerita-kami" />} />
          <Route path="/tentang/jurnal" element={<About section="jurnal" />} />
          <Route path="/tentang/jadi-partner" element={<About section="jadi-partner" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
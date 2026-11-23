import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Plus, Trash2, CheckCircle2, Package, Gavel, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatRupiah } from '../../data/mockData';

export default function AdminDashboard({
  products,
  onAddProduct,
  onDeleteProduct,
  auctions,
  onAddAuction,
  onCloseAuction,
  orders,
  onUpdateOrderStatus,
}) {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('produk');

  // Form Tambah Produk
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'smartphone',
    tagline: '',
    price: '',
    stock: 10,
    badge: 'BARU',
  });

  // Form Tambah Lot Lelang
  const [newLot, setNewLot] = useState({
    name: '',
    category: 'komputer',
    variantInfo: '',
    startingBid: '',
    bidIncrement: 50000,
  });

  if (!isAdmin) {
    return <Navigate to="/akun" replace />;
  }

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const slug = newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    onAddProduct({
      id: `prod-${Date.now()}`,
      slug,
      name: newProd.name,
      brandCategory: `VOLT / ${newProd.category.toUpperCase()}`,
      category: newProd.category,
      tagline: newProd.tagline || 'Perangkat pilihan terbaru VOLT.',
      price: Number(newProd.price),
      originalPrice: null,
      badge: newProd.badge || null,
      isPromo: false,
      condition: 'Baru, segel',
      stock: Number(newProd.stock),
      image: `https://placehold.co/800x800/EAE8E3/181818?text=${encodeURIComponent(newProd.name)}`,
      colors: [{ name: 'Standard', hex: '#181818' }],
      specsSummary: { Model: newProd.name, Kondisi: 'Baru, segel' },
      highlightsTitle: 'Dirancang untuk keseharianmu.',
      highlights: [{ title: 'Kualitas VOLT', desc: 'Bergaransi resmi dan terkurasi.' }],
    });
    setNewProd({ name: '', category: 'smartphone', tagline: '', price: '', stock: 10, badge: 'BARU' });
  };

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const nextNum = String(auctions.length + 1).padStart(3, '0');
    const slug = `${newLot.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-lot-${nextNum}`;
    onAddAuction({
      id: `lot-${Date.now()}`,
      lotNumber: `LOT #${nextNum}`,
      slug,
      name: newLot.name,
      brandCategory: `VOLT / ${newLot.category.toUpperCase()}`,
      category: newLot.category,
      variantInfo: newLot.variantInfo || 'Baru, segel',
      color: 'Standard',
      condition: 'Baru, segel',
      isFeatured: false,
      status: 'BERLANGSUNG',
      badgeText: 'BERLANGSUNG',
      currentBid: Number(newLot.startingBid),
      bidIncrement: Number(newLot.bidIncrement),
      totalBids: 0,
      remainingSeconds: 4 * 3600,
      startTime: 'Hari ini',
      endTime: '+4 jam dari sekarang',
      seller: 'VOLT Official',
      image: `https://placehold.co/800x800/EAE8E3/181818?text=${encodeURIComponent(newLot.name)}`,
      history: [],
    });
    setNewLot({ name: '', category: 'komputer', variantInfo: '', startingBid: '', bidIncrement: 50000 });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Admin */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E5E5E2]">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
            VOLT CONTROL PANEL
          </p>
          <h1 className="mt-1 font-display font-bold text-3xl text-[#181818]">
            Dashboard Admin.
          </h1>
        </div>
        <Link to="/" className="text-xs font-medium underline underline-offset-4 text-[#181818]">
          Lihat tampilan toko →
        </Link>
      </div>

      {/* Ringkasan Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <div className="bg-[#F5F5F3] p-6 rounded-2xl">
          <p className="text-xs text-[#6E6E6B]">Total Produk Katalog</p>
          <p className="mt-1 font-display font-bold text-3xl">{products.length}</p>
        </div>
        <div className="bg-[#F5F5F3] p-6 rounded-2xl">
          <p className="text-xs text-[#6E6E6B]">Lot Lelang Aktif</p>
          <p className="mt-1 font-display font-bold text-3xl">
            {auctions.filter((a) => a.status !== 'SELESAI').length}
          </p>
        </div>
        <div className="bg-[#F5F5F3] p-6 rounded-2xl">
          <p className="text-xs text-[#6E6E6B]">Total Pesanan Masuk</p>
          <p className="mt-1 font-display font-bold text-3xl">{orders.length}</p>
        </div>
      </div>

      {/* Tab Navigasi Admin */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'produk', label: 'Kelola Produk', icon: Package },
          { id: 'lelang', label: 'Kelola Lelang', icon: Gavel },
          { id: 'pesanan', label: 'Pesanan Pelanggan', icon: ShoppingBag },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-[#181818] text-white'
                  : 'bg-[#F5F5F3] text-[#6E6E6B] hover:text-[#181818]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: KELOLA PRODUK */}
      {activeTab === 'produk' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Tambah Produk */}
          <form onSubmit={handleCreateProduct} className="lg:col-span-4 bg-[#F5F5F3] p-6 rounded-2xl space-y-4">
            <h2 className="font-display font-bold text-lg">Tambah produk baru</h2>

            <div>
              <label className="block text-xs font-medium mb-1">Nama produk</label>
              <input
                type="text"
                required
                value={newProd.name}
                onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                placeholder="Contoh: VoltPhone X1"
                className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Kategori</label>
              <select
                value={newProd.category}
                onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3 py-2 text-sm"
              >
                <option value="audio">Audio & suara</option>
                <option value="komputer">Laptop & komputer</option>
                <option value="smartphone">Smartphone</option>
                <option value="smart-living">Smart living & wearables</option>
                <option value="aksesori">Aksesori</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Tagline singkat</label>
              <input
                type="text"
                value={newProd.tagline}
                onChange={(e) => setNewProd({ ...newProd, tagline: e.target.value })}
                placeholder="Layar jernih, performa harian."
                className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  required
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                  placeholder="4999000"
                  className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Stok</label>
                <input
                  type="number"
                  required
                  value={newProd.stock}
                  onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                  className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#DDFD5B] text-[#181818] text-xs font-semibold py-3 rounded-lg hover:bg-[#D1F542]"
            >
              <Plus className="w-4 h-4" />
              Simpan ke katalog
            </button>
          </form>

          {/* Tabel Produk */}
          <div className="lg:col-span-8 divide-y divide-[#E5E5E2] border-y border-[#E5E5E2]">
            {products.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-[#F5F5F3]" />
                  <div>
                    <p className="font-display font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-[#6E6E6B] capitalize">
                      {item.category} · Stok: {item.stock}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold">{formatRupiah(item.price)}</span>
                  <button
                    type="button"
                    onClick={() => onDeleteProduct(item.id)}
                    className="p-2 text-[#6E6E6B] hover:text-red-600"
                    title="Hapus produk"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: KELOLA LELANG */}
      {activeTab === 'lelang' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form onSubmit={handleCreateAuction} className="lg:col-span-4 bg-[#F5F5F3] p-6 rounded-2xl space-y-4">
            <h2 className="font-display font-bold text-lg">Buat lot lelang baru</h2>

            <div>
              <label className="block text-xs font-medium mb-1">Nama perangkat</label>
              <input
                type="text"
                required
                value={newLot.name}
                onChange={(e) => setNewLot({ ...newLot, name: e.target.value })}
                placeholder="Contoh: Book Air 14 Pro"
                className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Detail varian & kondisi</label>
              <input
                type="text"
                value={newLot.variantInfo}
                onChange={(e) => setNewLot({ ...newLot, variantInfo: e.target.value })}
                placeholder="Graphite · Baru, segel"
                className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Harga awal (Rp)</label>
                <input
                  type="number"
                  required
                  value={newLot.startingBid}
                  onChange={(e) => setNewLot({ ...newLot, startingBid: e.target.value })}
                  placeholder="1000000"
                  className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Kelipatan (Rp)</label>
                <input
                  type="number"
                  required
                  value={newLot.bidIncrement}
                  onChange={(e) => setNewLot({ ...newLot, bidIncrement: e.target.value })}
                  className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#181818] text-white text-xs font-semibold py-3 rounded-lg"
            >
              <Plus className="w-4 h-4" />
              Publikasikan lot
            </button>
          </form>

          <div className="lg:col-span-8 divide-y divide-[#E5E5E2] border-y border-[#E5E5E2]">
            {auctions.map((lot) => (
              <div key={lot.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#6E6E6B]">{lot.lotNumber}</span>
                  <p className="font-display font-semibold text-sm">{lot.name}</p>
                  <p className="text-xs text-[#6E6E6B]">
                    Bid tertinggi: {formatRupiah(lot.currentBid)} ({lot.totalBids} penawaran) · Pemenang sementara: {lot.history[0]?.bidder || '-'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded ${
                      lot.status === 'SELESAI'
                        ? 'bg-[#E5E5E2] text-[#6E6E6B]'
                        : 'bg-[#DDFD5B] text-[#181818]'
                    }`}
                  >
                    {lot.status}
                  </span>
                  {lot.status !== 'SELESAI' && (
                    <button
                      type="button"
                      onClick={() => onCloseAuction(lot.id)}
                      className="text-xs border border-[#181818] px-3 py-1.5 rounded-lg hover:bg-[#181818] hover:text-white transition"
                    >
                      Akhiri lelang
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PESANAN PELANGGAN */}
      {activeTab === 'pesanan' && (
        <div>
          {orders.length === 0 ? (
            <div className="bg-[#F5F5F3] rounded-2xl p-10 text-center text-sm text-[#6E6E6B]">
              Belum ada pesanan baru dari checkout. Coba lakukan transaksi dari halaman keranjang untuk menguji alur pesanan masuk.
            </div>
          ) : (
            <div className="divide-y divide-[#E5E5E2] border-y border-[#E5E5E2]">
              {orders.map((ord) => (
                <div key={ord.orderNumber} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-display font-bold text-sm">{ord.orderNumber} — {ord.customer}</p>
                    <p className="text-xs text-[#6E6E6B] mt-0.5">
                      Total: {formatRupiah(ord.total)} · {ord.items.length} item
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={ord.status}
                      onChange={(e) => onUpdateOrderStatus(ord.orderNumber, e.target.value)}
                      className="bg-[#F5F5F3] border border-[#E5E5E2] rounded-lg px-3 py-2 text-xs font-medium"
                    >
                      <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                      <option value="Diproses">Diproses</option>
                      <option value="Dikirim">Dikirim</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
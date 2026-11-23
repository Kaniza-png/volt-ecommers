import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, formatRupiah } from '../data/mockData';

export default function ProductDetail({ onAddToCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);

  const handleBuyNow = () => {
    if (onAddToCart) {
      onAddToCart(product, selectedColor);
    }
    navigate('/keranjang');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#6E6E6B] mb-8">
        <Link to="/" className="hover:text-[#181818]">Beranda</Link>
        <span className="mx-2">/</span>
        <Link to={`/kategori/${product.category}`} className="hover:text-[#181818] capitalize">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#181818]">{product.name}</span>
      </nav>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Kiri: Galeri Gambar */}
        <div className="lg:col-span-7">
          <div className="relative aspect-square bg-[#F5F5F3] rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={`${product.name} ${selectedColor}`}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-white text-[#181818] text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded">
                {product.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-[#6E6E6B] mt-3">
            {product.name} {selectedColor} — Foto produk untuk varian {selectedColor}.
          </p>
        </div>

        {/* Kanan: Detail & Pembelian */}
        <div className="lg:col-span-5">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
            {product.brandCategory}
          </p>
          <h1 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-[#181818]">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-[#6E6E6B]">{product.tagline}</p>

          {/* Harga */}
          <div className="mt-6 pb-6 border-b border-[#E5E5E2]">
            <div className="flex items-baseline gap-3">
              <span className="font-display font-bold text-2xl text-[#181818]">
                {formatRupiah(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#6E6E6B] line-through">
                  {formatRupiah(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-xs text-[#6E6E6B] mt-1">Harga untuk varian {selectedColor}</p>
          </div>

          {/* Pilihan Warna */}
          <div className="mt-6">
            <p className="text-xs font-medium text-[#181818] mb-3">Warna pilihan</p>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition ${
                    selectedColor === c.name
                      ? 'border-[#181818] bg-[#F5F5F3] text-[#181818]'
                      : 'border-[#E5E5E2] text-[#6E6E6B] hover:border-[#181818]'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/10"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Konfigurasi RAM/SSD khusus Laptop */}
          {product.storageOptions && (
            <div className="mt-5">
              <p className="text-xs font-medium text-[#181818] mb-2">RAM & penyimpanan</p>
              <div className="inline-block px-4 py-2 rounded-lg text-xs font-medium border border-[#181818] bg-[#F5F5F3]">
                {product.storageOptions[0]}
              </div>
            </div>
          )}

          {/* Status Stok */}
          <div className="mt-6 flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Tersedia — Kondisi {product.condition}</span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => onAddToCart && onAddToCart(product, selectedColor)}
              className="flex-1 bg-[#181818] text-white text-sm font-medium py-3.5 px-6 rounded-lg hover:bg-black/85 transition"
            >
              Tambah ke keranjang
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 bg-[#DDFD5B] text-[#181818] text-sm font-semibold py-3.5 px-6 rounded-lg hover:bg-[#D1F542] transition"
            >
              Beli sekarang
            </button>
          </div>

          <p className="mt-4 text-xs text-[#6E6E6B]">
            Garansi resmi · Dikemas aman untuk pengiriman · Ongkos kirim dihitung saat checkout.
          </p>
        </div>
      </div>

      {/* Sorotan Utama */}
      <section className="mt-20 pt-14 border-t border-[#E5E5E2]">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
          SOROTAN UTAMA
        </p>
        <h2 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-[#181818]">
          {product.highlightsTitle}
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.highlights.map((item, idx) => (
            <div key={idx} className="bg-[#F5F5F3] p-6 rounded-xl">
              {item.metric && (
                <p className="font-display font-bold text-2xl text-[#181818] mb-2">{item.metric}</p>
              )}
              <h3 className="font-display font-semibold text-base text-[#181818]">{item.title}</h3>
              <p className="text-sm text-[#6E6E6B] mt-1.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tabel Spesifikasi Ringkas */}
      <section className="mt-16 pt-12 border-t border-[#E5E5E2]">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
          KENALI LEBIH DEKAT
        </p>
        <h2 className="mt-2 font-display font-bold text-2xl text-[#181818] mb-6">
          Detail yang penting.
        </h2>

        <div className="divide-y divide-[#E5E5E2] border-y border-[#E5E5E2]">
          {Object.entries(product.specsSummary).map(([key, val]) => (
            <div key={key} className="py-3.5 flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
              <span className="text-[#6E6E6B]">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="font-medium text-[#181818]">{val}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <Link
          to="/produk"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#6E6E6B] hover:text-[#181818]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke katalog
        </Link>
      </div>
    </div>
  );
}
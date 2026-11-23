import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';

export default function Catalog({ isPromoPage = false, onQuickAdd }) {
  const { slug } = useParams();
  const activeSlug = isPromoPage ? 'promo' : slug || 'semua';

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('terbaru');

  const currentCategory = CATEGORIES.find((c) => c.slug === activeSlug) || CATEGORIES[0];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (isPromoPage) {
      list = list.filter((p) => p.isPromo);
    } else if (activeSlug !== 'semua') {
      list = list.filter(
        (p) => p.category === activeSlug || p.secondaryCategory === activeSlug
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'termurah') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'termahal') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [activeSlug, isPromoPage, searchQuery, sortBy]);

  const pageTitle = isPromoPage
    ? 'Upgrade cerdas, lebih hemat.'
    : activeSlug === 'semua'
    ? 'Temukan upgrade-mu.'
    : activeSlug === 'audio'
    ? 'Dengarkan lebih banyak.'
    : activeSlug === 'komputer'
    ? 'Ruang besar untuk ide besar.'
    : activeSlug === 'smart-living'
    ? 'Lebih pintar, lebih dekat.'
    : activeSlug === 'smartphone'
    ? 'Smartphone pilihan berikutnya.'
    : 'Detail kecil, manfaat besar.';

  const pageSubtitle = isPromoPage
    ? 'Harga pilihan untuk elektronik yang siap jadi andalanmu.'
    : currentCategory.subtitle;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#6E6E6B] mb-8">
        <Link to="/" className="hover:text-[#181818]">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="text-[#181818]">
          {isPromoPage ? 'Promo' : currentCategory.name}
        </span>
      </nav>

      {/* Header Katalog */}
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
          {isPromoPage ? 'SMALL UPGRADE. GREAT DEAL.' : 'THE VOLT COLLECTION'}
        </p>
        <h1 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-[#181818]">
          {pageTitle}
        </h1>
        <p className="mt-2 text-sm text-[#6E6E6B]">{pageSubtitle}</p>
      </div>

      {/* Filter Pills + Search + Sort */}
      {!isPromoPage && (
        <div className="mt-8 pb-6 border-b border-[#E5E5E2] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = activeSlug === cat.slug;
              return (
                <Link
                  key={cat.id}
                  to={cat.slug === 'semua' ? '/produk' : `/kategori/${cat.slug}`}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                    isSelected
                      ? 'bg-[#181818] text-white'
                      : 'bg-[#F5F5F3] text-[#6E6E6B] hover:text-[#181818]'
                  }`}
                >
                  {cat.navLabel || cat.name}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#6E6E6B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk di koleksi VOLT..."
                className="bg-[#F5F5F3] rounded-lg pl-9 pr-4 py-2 text-xs text-[#181818] placeholder:text-[#6E6E6B] focus:outline-none focus:ring-1 focus:ring-[#181818]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F5F5F3] rounded-lg px-3 py-2 text-xs text-[#181818] focus:outline-none"
            >
              <option value="terbaru">Urutan: Terbaru</option>
              <option value="termurah">Harga: Terendah</option>
              <option value="termahal">Harga: Tertinggi</option>
            </select>
          </div>
        </div>
      )}

      {/* Jumlah Produk */}
      <div className="mt-6 mb-6 text-xs text-[#6E6E6B]">
        {filteredProducts.length} produk tersedia
      </div>

      {/* Grid Produk atau Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickAdd={onQuickAdd} />
          ))}
        </div>
      ) : (
        <div className="bg-[#F5F5F3] rounded-2xl p-12 text-center my-8">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
            KOLEKSI BERIKUTNYA
          </p>
          <h2 className="mt-2 font-display font-bold text-2xl text-[#181818]">
            Belum ada produk di kategori ini.
          </h2>
          <p className="mt-2 text-sm text-[#6E6E6B] max-w-md mx-auto">
            Pilihan lain untuk upgrade harimu tetap tersedia di katalog VOLT.
          </p>
          <Link
            to="/produk"
            className="mt-6 inline-flex items-center gap-2 bg-[#181818] text-white text-xs font-medium px-5 py-3 rounded-lg hover:bg-black/85 transition"
          >
            Jelajahi produk lainnya
          </Link>
        </div>
      )}

      {/* Kembali ke Beranda */}
      <div className="mt-14 pt-6 border-t border-[#E5E5E2]">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#6E6E6B] hover:text-[#181818]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
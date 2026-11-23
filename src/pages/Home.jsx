import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ShieldCheck, PackageCheck, Headphones, Sparkles } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';

export default function Home({ onQuickAdd }) {
  const [activeTab, setActiveTab] = useState('terlaris');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categoryCards = CATEGORIES.filter((c) => c.id !== 'semua');

  const displayedProducts =
    activeTab === 'terlaris'
      ? PRODUCTS
      : [...PRODUCTS].reverse();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-[#F5F5F3] border-b border-[#E5E5E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
              TECH THAT MOVES YOU
            </p>
            <h1 className="mt-4 font-display font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] tracking-tight text-[#181818]">
              Upgrade kecil.<br />
              Bedanya besar.
            </h1>
            <p className="mt-5 text-base text-[#6E6E6B] max-w-md leading-relaxed">
              Dari fokus kerja sampai waktu santai. Temukan elektronik pilihan untuk versi terbaik harimu.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                to="/produk"
                className="inline-flex items-center gap-3 bg-[#181818] text-white text-sm font-medium px-6 py-3.5 rounded-lg hover:bg-black/85 transition"
              >
                Jelajahi produk
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/produk/book-air-14"
                className="text-sm font-medium text-[#181818] underline underline-offset-4 hover:opacity-70"
              >
                Lihat yang baru
              </Link>
            </div>
          </div>

          {/* Hero Showcase Card */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#EAE8E3] rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://placehold.co/900x680/EAE8E3/181818?text=VOLT+AirSound+Pro"
                alt="VOLT AirSound Pro"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-5 right-5 bg-[#DDFD5B] text-[#181818] text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                NEW COLLECTION
              </span>
              <Link
                to="/produk/airsound-pro"
                className="absolute bottom-5 right-5 bg-white p-4 rounded-xl shadow-sm flex items-center justify-between gap-6 hover:bg-[#F5F5F3] transition max-w-xs"
              >
                <div>
                  <p className="font-display font-semibold text-sm text-[#181818]">VOLT AirSound Pro</p>
                  <p className="text-xs text-[#6E6E6B] mt-0.5">Suara jernih. Dunia lebih tenang.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#181818] shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DIPILIH UNTUK KESEHARIANMU (01 - 05) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B] mb-6">
          DIPILIH UNTUK KESEHARIANMU
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-[#E5E5E2]">
          {categoryCards.map((cat) => (
            <Link
              key={cat.id}
              to={`/kategori/${cat.slug}`}
              className="group p-5 border-r border-b border-[#E5E5E2] hover:bg-[#F5F5F3] transition flex flex-col justify-between min-h-[104px]"
            >
              <span className="text-xs text-[#6E6E6B]">{cat.number}</span>
              <div className="flex items-center justify-between mt-4">
                <span className="font-display font-medium text-sm text-[#181818]">{cat.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#6E6E6B] group-hover:text-[#181818] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* THE EVERYDAY ESSENTIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
              THE EVERYDAY ESSENTIALS
            </p>
            <h2 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-[#181818]">
              Favorit, bukan tanpa alasan.
            </h2>
            <p className="text-sm text-[#6E6E6B] mt-1">Teknologi pilihan. Siap jadi andalan.</p>
          </div>

          <div className="inline-flex bg-[#F5F5F3] p-1 rounded-lg self-start">
            <button
              type="button"
              onClick={() => setActiveTab('terlaris')}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition ${
                activeTab === 'terlaris'
                  ? 'bg-white text-[#181818] shadow-sm'
                  : 'text-[#6E6E6B] hover:text-[#181818]'
              }`}
            >
              Terlaris
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('terbaru')}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition ${
                activeTab === 'terbaru'
                  ? 'bg-white text-[#181818] shadow-sm'
                  : 'text-[#6E6E6B] hover:text-[#181818]'
              }`}
            >
              Terbaru
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickAdd={onQuickAdd} />
          ))}
        </div>
      </section>

      {/* VALUE PROPOSITION BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-y border-[#E5E5E2] py-10">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#181818] shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <h3 className="font-display font-semibold text-sm text-[#181818]">Garansi resmi</h3>
              <p className="text-xs text-[#6E6E6B] mt-1">Tenang, semua produk terlindungi.</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <PackageCheck className="w-5 h-5 text-[#181818] shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <h3 className="font-display font-semibold text-sm text-[#181818]">Pengiriman aman</h3>
              <p className="text-xs text-[#6E6E6B] mt-1">Dikemas rapi, sampai sepenuh hati.</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <Headphones className="w-5 h-5 text-[#181818] shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <h3 className="font-display font-semibold text-sm text-[#181818]">Bantuan manusia</h3>
              <p className="text-xs text-[#6E6E6B] mt-1">Tim kami siap bantu pilih yang pas.</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <Sparkles className="w-5 h-5 text-[#181818] shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <h3 className="font-display font-semibold text-sm text-[#181818]">Pilihan terkurasi</h3>
              <p className="text-xs text-[#6E6E6B] mt-1">Hanya yang layak buat keseharianmu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#F5F5F3] rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
              SELANGKAH LEBIH UPDATE
            </p>
            <h2 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-[#181818]">
              Kabar baru. Upgrade seru.
            </h2>
            <p className="text-sm text-[#6E6E6B] mt-1.5">
              Produk terbaru, inspirasi setup, dan penawaran pilihan. Tanpa spam.
            </p>
          </div>

          <div className="w-full max-w-md">
            {subscribed ? (
              <div className="bg-white border border-[#E5E5E2] rounded-xl p-4 text-sm text-[#181818]">
                Terima kasih! Email kamu telah terdaftar untuk update terbaru VOLT.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat email kamu"
                  className="flex-1 bg-white border border-[#E5E5E2] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#181818]"
                />
                <button
                  type="submit"
                  className="bg-[#181818] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-black/85 transition shrink-0"
                >
                  Daftar sekarang
                </button>
              </form>
            )}
            <p className="text-[11px] text-[#6E6E6B] mt-2">
              Dengan mendaftar kamu menyetujui Kebijakan Privasi VOLT.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
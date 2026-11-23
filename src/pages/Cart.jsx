import { Link } from 'react-router-dom';
import { ArrowUpRight, Minus, Plus, Trash2, ShieldCheck, PackageCheck, Headphones } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../data/mockData';

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalItems, subtotal, isFreeShipping } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#6E6E6B] mb-8">
        <Link to="/" className="hover:text-[#181818]">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="text-[#181818]">Keranjang</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#181818]">
          Keranjangmu.
        </h1>
        <p className="mt-2 text-sm text-[#6E6E6B]">Semua pilihanmu, satu tempat.</p>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Kiri: Daftar Produk atau Empty State */}
        <div className="lg:col-span-8">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B] mb-4">
            {totalItems} PRODUK DIPILIH
          </p>

          {cart.length === 0 ? (
            <div className="bg-[#F5F5F3] rounded-2xl p-10 sm:p-14">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#181818]">
                Belum ada upgrade di sini.
              </h2>
              <p className="mt-3 text-sm text-[#6E6E6B] max-w-md leading-relaxed">
                Jelajahi koleksi VOLT dan temukan perangkat yang pas untuk keseharianmu.
              </p>
              <Link
                to="/produk"
                className="mt-8 inline-flex items-center gap-2 bg-[#DDFD5B] text-[#181818] text-sm font-semibold px-6 py-3.5 rounded-lg hover:bg-[#D1F542] transition"
              >
                Mulai jelajahi produk
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E5E2] border-y border-[#E5E5E2]">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/produk/${item.slug}`}
                      className="w-20 h-20 bg-[#F5F5F3] rounded-xl overflow-hidden shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/produk/${item.slug}`}
                        className="font-display font-semibold text-base text-[#181818] hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-[#6E6E6B] mt-0.5">Varian: {item.color}</p>
                      <p className="text-sm font-semibold text-[#181818] mt-2">
                        {formatRupiah(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* Kontrol Kuantitas & Hapus */}
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="inline-flex items-center border border-[#E5E5E2] rounded-lg">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.color, -1)}
                        className="p-2 text-[#6E6E6B] hover:text-[#181818]"
                        aria-label="Kurangi jumlah"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-medium">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.color, 1)}
                        className="p-2 text-[#6E6E6B] hover:text-[#181818]"
                        aria-label="Tambah jumlah"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.color)}
                      className="p-2 text-[#6E6E6B] hover:text-red-600 transition"
                      aria-label="Hapus produk"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Kanan: Ringkasan Belanja */}
        <div className="lg:col-span-4 bg-[#F5F5F3] rounded-2xl p-6 sm:p-8">
          <h2 className="font-display font-semibold text-lg text-[#181818]">
            Ringkasan belanja
          </h2>

          <div className="mt-6 space-y-3 text-sm border-b border-[#E5E5E2] pb-5">
            <div className="flex justify-between text-[#6E6E6B]">
              <span>Subtotal ({totalItems} produk)</span>
              <span className="font-medium text-[#181818]">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#6E6E6B]">
              <span>Pengiriman</span>
              <span className="text-[#181818]">
                {cart.length === 0
                  ? 'Saat checkout'
                  : isFreeShipping
                  ? 'Gratis ongkir'
                  : 'Dihitung saat checkout'}
              </span>
            </div>
          </div>

          <div className="mt-5 flex justify-between items-baseline">
            <span className="text-sm font-medium text-[#181818]">Total sementara</span>
            <span className="font-display font-bold text-xl text-[#181818]">
              {formatRupiah(subtotal)}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="mt-6">
              <button
                type="button"
                disabled
                className="w-full bg-[#E5E5E2] text-[#6E6E6B] text-sm font-medium py-3.5 px-6 rounded-lg cursor-not-allowed"
              >
                Tambahkan produk dulu
              </button>
              <p className="text-xs text-[#6E6E6B] mt-3 text-center">
                Checkout tersedia setelah ada produk di keranjang.
              </p>
            </div>
          ) : (
            <div className="mt-6">
              <Link
                to="/checkout"
                className="block w-full text-center bg-[#181818] text-white text-sm font-medium py-3.5 px-6 rounded-lg hover:bg-black/85 transition"
              >
                Lanjut ke checkout
              </Link>
              {isFreeShipping && (
                <p className="text-xs text-emerald-700 font-medium mt-3 text-center">
                  Pesananmu memenuhi syarat gratis ongkir VOLT.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Trust Strip */}
      <div className="mt-16 pt-8 border-t border-[#E5E5E2] flex flex-wrap gap-8 text-xs text-[#6E6E6B]">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#181818]" /> Garansi resmi
        </span>
        <span className="inline-flex items-center gap-2">
          <PackageCheck className="w-4 h-4 text-[#181818]" /> Pengiriman aman
        </span>
        <span className="inline-flex items-center gap-2">
          <Headphones className="w-4 h-4 text-[#181818]" /> Tim yang siap membantu
        </span>
      </div>
    </div>
  );
}
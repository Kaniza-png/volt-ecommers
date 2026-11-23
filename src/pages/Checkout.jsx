import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../data/mockData';

export default function Checkout() {
  const { cart, subtotal, isFreeShipping, clearCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState('reguler');
  const [paymentMethod, setPaymentMethod] = useState('va');
  const [orderSubmitted, setOrderSubmitted] = useState(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
  });

  const shippingCost =
    shippingMethod === 'express' ? 45000 : isFreeShipping ? 0 : 25000;
  const grandTotal = subtotal + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderNumber = `VLT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSubmitted({
      orderNumber,
      customer: form.fullName,
      total: grandTotal,
      items: [...cart],
    });
    clearCart();
  };

  if (orderSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-[#F5F5F3] rounded-2xl p-10 sm:p-12">
          <CheckCircle2 className="w-12 h-12 text-[#181818] mx-auto mb-4" strokeWidth={1.75} />
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
            PESANAN DITERIMA
          </p>
          <h1 className="mt-2 font-display font-bold text-3xl text-[#181818]">
            Terima kasih, {orderSubmitted.customer}.
          </h1>
          <p className="mt-2 text-sm text-[#6E6E6B]">
            Nomor pesananmu: <span className="font-semibold text-[#181818]">{orderSubmitted.orderNumber}</span>
          </p>

          <div className="mt-6 bg-white rounded-xl p-5 text-left text-sm space-y-2 border border-[#E5E5E2]">
            <div className="flex justify-between">
              <span className="text-[#6E6E6B]">Total pembayaran</span>
              <span className="font-bold text-[#181818]">{formatRupiah(orderSubmitted.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6E6E6B]">Status</span>
              <span className="text-emerald-700 font-medium">Menunggu konfirmasi pembayaran</span>
            </div>
          </div>

          <Link
            to="/produk"
            className="mt-8 inline-block bg-[#181818] text-white text-sm font-medium px-6 py-3.5 rounded-lg hover:bg-black/85 transition"
          >
            Kembali jelajahi katalog
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display font-bold text-2xl text-[#181818]">Keranjang masih kosong</h1>
        <p className="text-sm text-[#6E6E6B] mt-2">Pilih produk terlebih dahulu sebelum checkout.</p>
        <Link
          to="/produk"
          className="mt-6 inline-block bg-[#181818] text-white text-sm font-medium px-6 py-3 rounded-lg"
        >
          Lihat katalog produk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/keranjang"
        className="inline-flex items-center gap-2 text-xs font-medium text-[#6E6E6B] hover:text-[#181818] mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Kembali ke keranjang
      </Link>

      <h1 className="font-display font-bold text-3xl text-[#181818] mb-8">Checkout pesanan.</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Kiri: Data Pengiriman & Pembayaran */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-[#F5F5F3] rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-display font-semibold text-lg text-[#181818]">
              1. Alamat pengiriman
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5">Nama penerima</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Nama lengkap"
                  className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#181818]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Nomor WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="08xxxxxxxxxx"
                  className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#181818]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nama@email.com"
                  className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#181818]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Kota / Kecamatan</label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Contoh: Tangerang Selatan"
                  className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#181818]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5">Alamat lengkap</label>
              <textarea
                rows={3}
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Nama jalan, nomor rumah, RT/RW, kode pos"
                className="w-full bg-white border border-[#E5E5E2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#181818]"
              />
            </div>
          </div>

          {/* Layanan Pengiriman */}
          <div className="bg-[#F5F5F3] rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="font-display font-semibold text-lg text-[#181818]">
              2. Layanan pengiriman
            </h2>
            <label className="flex items-center justify-between bg-white p-4 rounded-xl border border-[#E5E5E2] cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'reguler'}
                  onChange={() => setShippingMethod('reguler')}
                />
                <div>
                  <p className="text-sm font-medium">Pengiriman Reguler (2–4 hari kerja)</p>
                  <p className="text-xs text-[#6E6E6B]">Gratis untuk pesanan mulai Rp500.000</p>
                </div>
              </div>
              <span className="text-sm font-semibold">
                {isFreeShipping ? 'Gratis' : formatRupiah(25000)}
              </span>
            </label>

            <label className="flex items-center justify-between bg-white p-4 rounded-xl border border-[#E5E5E2] cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                />
                <div>
                  <p className="text-sm font-medium">Next Day Express (1 hari kerja)</p>
                  <p className="text-xs text-[#6E6E6B]">Prioritas pengemasan aman</p>
                </div>
              </div>
              <span className="text-sm font-semibold">{formatRupiah(45000)}</span>
            </label>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-[#F5F5F3] rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="font-display font-semibold text-lg text-[#181818]">
              3. Metode pembayaran
            </h2>
            {[
              { id: 'va', title: 'Transfer Virtual Account (BCA / Mandiri / BNI)', desc: 'Verifikasi otomatis' },
              { id: 'qris', title: 'QRIS Instan', desc: 'Scan menggunakan aplikasi e-wallet atau mobile banking' },
              { id: 'cc', title: 'Kartu Kredit / Debit', desc: 'Visa & Mastercard' },
            ].map((m) => (
              <label
                key={m.id}
                className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#E5E5E2] cursor-pointer"
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === m.id}
                  onChange={() => setPaymentMethod(m.id)}
                />
                <div>
                  <p className="text-sm font-medium">{m.title}</p>
                  <p className="text-xs text-[#6E6E6B]">{m.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Kanan: Ringkasan Pesanan */}
        <div className="lg:col-span-5 bg-[#F5F5F3] rounded-2xl p-6 sm:p-8">
          <h2 className="font-display font-semibold text-lg text-[#181818]">Ringkasan pesanan</h2>

          <div className="mt-5 divide-y divide-[#E5E5E2] border-b border-[#E5E5E2] pb-4">
            {cart.map((item) => (
              <div key={`${item.id}-${item.color}`} className="py-3 flex justify-between text-sm gap-4">
                <div>
                  <p className="font-medium text-[#181818]">
                    {item.name} × {item.qty}
                  </p>
                  <p className="text-xs text-[#6E6E6B]">{item.color}</p>
                </div>
                <span className="font-medium">{formatRupiah(item.price * item.qty)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2.5 text-sm border-b border-[#E5E5E2] pb-4">
            <div className="flex justify-between text-[#6E6E6B]">
              <span>Subtotal</span>
              <span className="text-[#181818]">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#6E6E6B]">
              <span>Ongkos kirim</span>
              <span className="text-[#181818]">
                {shippingCost === 0 ? 'Gratis' : formatRupiah(shippingCost)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-baseline">
            <span className="text-sm font-medium">Total bayar</span>
            <span className="font-display font-bold text-2xl text-[#181818]">
              {formatRupiah(grandTotal)}
            </span>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-[#DDFD5B] text-[#181818] text-sm font-semibold py-3.5 px-6 rounded-lg hover:bg-[#D1F542] transition"
          >
            Buat pesanan sekarang
          </button>
        </div>
      </form>
    </div>
  );
}
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { formatRupiah } from '../data/mockData';
import { useCountdown } from '../hooks/useCountdown';

export default function AuctionDetail({ auctions, onPlaceBid }) {
  const { slug } = useParams();
  const lot = auctions.find((a) => a.slug === slug) || auctions[0];
  const timer = useCountdown(lot.remainingSeconds);

  const minNextBid = lot.currentBid + lot.bidIncrement;
  const [bidAmount, setBidAmount] = useState(minNextBid);
  const [bidderName, setBidderName] = useState('Farel A.');
  const [feedback, setFeedback] = useState(null);

  const handleQuickIncrement = () => {
    const next = Math.max(bidAmount, lot.currentBid) + lot.bidIncrement;
    setBidAmount(next);
    setFeedback(null);
  };

  const handleSubmitBid = (e) => {
    e.preventDefault();
    const numericBid = Number(bidAmount);

    if (numericBid < lot.currentBid + lot.bidIncrement) {
      setFeedback({
        type: 'error',
        text: `Minimal penawaran berikutnya adalah ${formatRupiah(lot.currentBid + lot.bidIncrement)}.`,
      });
      return;
    }

    onPlaceBid(lot.id, numericBid, bidderName.trim() || 'Peserta VOLT');
    setBidAmount(numericBid + lot.bidIncrement);
    setFeedback({
      type: 'success',
      text: `Penawaran sebesar ${formatRupiah(numericBid)} berhasil dipasang!`,
    });
  };

  const currentLeader = lot.history[0]?.bidder || '-';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#6E6E6B] mb-8">
        <Link to="/" className="hover:text-[#181818]">Beranda</Link>
        <span className="mx-2">/</span>
        <Link to="/lelang" className="hover:text-[#181818]">Lelang</Link>
        <span className="mx-2">/</span>
        <span className="text-[#181818]">{lot.name}</span>
      </nav>

      {/* Split Layout Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Kiri: Foto Produk Lot */}
        <div className="lg:col-span-6">
          <div className="relative aspect-square bg-[#F5F5F3] rounded-2xl overflow-hidden">
            <img src={lot.image} alt={lot.name} className="w-full h-full object-cover" />
            <span className="absolute top-4 left-4 bg-[#DDFD5B] text-[#181818] text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded">
              AKTIF
            </span>
          </div>
          <p className="text-xs text-[#6E6E6B] mt-3">
            {lot.name} {lot.color} — Foto produk untuk varian {lot.color}.
          </p>
        </div>

        {/* Kanan: Panel Bidding Real-Time */}
        <div className="lg:col-span-6">
          <div className="flex items-center justify-between text-xs text-[#6E6E6B]">
            <span className="font-semibold tracking-[0.14em] uppercase">{lot.brandCategory}</span>
            <span className="font-mono">{lot.lotNumber}</span>
          </div>

          <h1 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-[#181818]">
            {lot.name}
          </h1>
          <p className="mt-1.5 text-sm text-[#6E6E6B]">
            Ikuti penawaran real-time dan menangkan barang incaranmu.
          </p>

          {/* Box Harga Tertinggi & Timer */}
          <div className="mt-6 bg-[#F5F5F3] rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-[#6E6E6B]">Penawaran saat ini</p>
              <p className="mt-1 font-display font-bold text-3xl text-[#181818]">
                {formatRupiah(lot.currentBid)}
              </p>
              <p className="text-xs text-[#6E6E6B] mt-1">
                Penawaran tertinggi · {lot.totalBids} penawaran
              </p>
            </div>

            <div className="sm:border-l sm:border-[#E5E5E2] sm:pl-6 flex flex-col justify-center">
              <p className="text-xs text-[#6E6E6B]">Berakhir dalam</p>
              <p className="mt-1 font-mono font-bold text-2xl text-[#181818]">
                {timer.formatted}
              </p>
              <p className="text-xs text-emerald-700 font-medium mt-1">
                Lelang berlangsung · {lot.lotNumber}
              </p>
            </div>
          </div>

          {/* Form Pasang Penawaran */}
          <form onSubmit={handleSubmitBid} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#181818] mb-1.5">
                  Nama penawar
                </label>
                <input
                  type="text"
                  value={bidderName}
                  onChange={(e) => setBidderName(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-[#E5E5E2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#181818]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#181818] mb-1.5">
                  Nominal penawaran (Rp)
                </label>
                <input
                  type="number"
                  step={lot.bidIncrement}
                  min={lot.currentBid + lot.bidIncrement}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="w-full bg-[#F5F5F3] border border-[#E5E5E2] rounded-lg px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:border-[#181818]"
                />
              </div>
            </div>

            {feedback && (
              <div
                className={`p-3.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{feedback.text}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleQuickIncrement}
                className="flex-1 border border-[#181818] text-[#181818] text-sm font-medium py-3.5 px-5 rounded-lg hover:bg-[#F5F5F3] transition"
              >
                Tambah bid ({formatRupiah(lot.currentBid + lot.bidIncrement)})
              </button>

              <button
                type="submit"
                className="flex-1 bg-[#DDFD5B] text-[#181818] text-sm font-semibold py-3.5 px-5 rounded-lg hover:bg-[#D1F542] transition"
              >
                Pasang penawaran
              </button>
            </div>
          </form>

          <p className="mt-4 text-xs text-[#6E6E6B] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#181818]" />
            Bid aman · Pembayaran setelah menang · Pemenang diumumkan setelah waktu lelang berakhir.
          </p>
        </div>
      </div>

      {/* Riwayat Penawaran & Detail Lot */}
      <div className="mt-20 pt-12 border-t border-[#E5E5E2] grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Riwayat Penawaran */}
        <div className="lg:col-span-6">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
            RIWAYAT PENAWARAN
          </p>
          <h2 className="mt-2 font-display font-bold text-2xl text-[#181818]">
            Siapa yang menawar?
          </h2>
          <p className="text-xs text-[#6E6E6B] mt-1 mb-6">
            Penawaran terbaru dari peserta lelang.
          </p>

          <div className="divide-y divide-[#E5E5E2] border-y border-[#E5E5E2]">
            {lot.history.map((item, idx) => (
              <div key={item.id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-sm text-[#181818] flex items-center gap-2">
                    {item.bidder}
                    {idx === 0 && (
                      <span className="bg-[#DDFD5B] text-[#181818] text-[10px] font-bold px-2 py-0.5 rounded">
                        TERTINGGI
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#6E6E6B] mt-0.5">{item.timeAgo}</p>
                </div>
                <span className="font-display font-bold text-sm text-[#181818]">
                  {formatRupiah(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Lelang */}
        <div className="lg:col-span-6">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
            DETAIL LELANG
          </p>
          <h2 className="mt-2 font-display font-bold text-2xl text-[#181818]">
            Semua yang perlu kamu tahu.
          </h2>
          <p className="text-xs text-[#6E6E6B] mt-1 mb-6">
            Transparan, real-time, dan mudah diikuti.
          </p>

          <div className="divide-y divide-[#E5E5E2] border-y border-[#E5E5E2] text-sm">
            {[
              ['Penjual', lot.seller],
              ['Waktu mulai', lot.startTime],
              ['Waktu berakhir', lot.endTime],
              ['Kelipatan bid', formatRupiah(lot.bidIncrement)],
              ['Total penawaran', `${lot.totalBids} penawaran`],
              ['Status', 'Berlangsung'],
              ['Pemenang sementara', currentLeader],
            ].map(([label, value]) => (
              <div key={label} className="py-3.5 flex justify-between">
                <span className="text-[#6E6E6B]">{label}</span>
                <span className="font-medium text-[#181818]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cara Ikut Lelang */}
      <section className="mt-16 pt-12 border-t border-[#E5E5E2]">
        <h2 className="font-display font-bold text-xl text-[#181818] mb-6">Cara ikut lelang</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { title: 'Daftar atau masuk akun', desc: 'Pastikan data akunmu sudah lengkap.' },
            { title: 'Masukkan bid berikutnya', desc: 'Gunakan kelipatan bid yang tersedia.' },
            { title: 'Menang dan checkout', desc: 'Bayar setelah menang dan tunggu pengiriman.' },
          ].map((c, i) => (
            <div key={i} className="bg-[#F5F5F3] p-5 rounded-xl">
              <h3 className="font-display font-semibold text-sm">{c.title}</h3>
              <p className="text-xs text-[#6E6E6B] mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <Link
          to="/lelang"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#6E6E6B] hover:text-[#181818]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke lelang
        </Link>
      </div>
    </div>
  );
}
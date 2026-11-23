import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, ShieldCheck, Eye } from 'lucide-react';
import { formatRupiah } from '../data/mockData';
import { useCountdown } from '../hooks/useCountdown';

function AuctionLotCard({ lot }) {
  const timer = useCountdown(lot.remainingSeconds);

  return (
    <div className="bg-[#F5F5F3] rounded-2xl overflow-hidden flex flex-col justify-between">
      <div>
        <div className="relative aspect-[4/3] bg-[#EAE8E3]">
          <img src={lot.image} alt={lot.name} className="w-full h-full object-cover" />
          <span
            className={`absolute top-3.5 left-3.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded ${
              lot.badgeText === 'SEGERA BERAKHIR'
                ? 'bg-[#DDFD5B] text-[#181818]'
                : 'bg-white text-[#181818]'
            }`}
          >
            {lot.badgeText}
          </span>
          <span className="absolute bottom-3.5 right-3.5 bg-[#181818] text-white font-mono text-xs font-medium px-3 py-1 rounded">
            {timer.formatted}
          </span>
        </div>

        <div className="p-6">
          <p className="text-[11px] font-semibold tracking-wider text-[#6E6E6B]">{lot.lotNumber}</p>
          <h3 className="mt-1 font-display font-bold text-xl text-[#181818]">{lot.name}</h3>
          <p className="text-xs text-[#6E6E6B] mt-0.5">{lot.variantInfo}</p>

          <div className="mt-5 pt-4 border-t border-[#E5E5E2] flex items-end justify-between">
            <div>
              <p className="text-[11px] text-[#6E6E6B]">Penawaran tertinggi</p>
              <p className="font-display font-bold text-xl text-[#181818] mt-0.5">
                {formatRupiah(lot.currentBid)}
              </p>
              <p className="text-[11px] text-[#6E6E6B] mt-0.5">
                Kelipatan {formatRupiah(lot.bidIncrement)}
              </p>
            </div>
            <span className="text-xs text-[#6E6E6B]">{lot.totalBids} penawaran</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Link
          to={`/lelang/${lot.slug}`}
          className="w-full inline-flex items-center justify-between bg-[#181818] text-white text-xs font-medium px-4 py-3.5 rounded-lg hover:bg-black/85 transition"
        >
          <span>Lihat lelang</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function Auctions({ auctions }) {
  const [selectedCat, setSelectedCat] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('segera');

  const featuredLot = auctions.find((a) => a.isFeatured) || auctions[0];
  const featuredTimer = useCountdown(featuredLot.remainingSeconds);

  const otherLots = useMemo(() => {
    let list = auctions.filter((a) => a.id !== featuredLot.id);

    if (selectedCat !== 'semua') {
      list = list.filter((a) => a.category === selectedCat);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.lotNumber.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'segera') {
      list.sort((a, b) => a.remainingSeconds - b.remainingSeconds);
    } else if (sortBy === 'terendah') {
      list.sort((a, b) => a.currentBid - b.currentBid);
    }

    return list;
  }, [auctions, featuredLot.id, selectedCat, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#6E6E6B] mb-8">
        <Link to="/" className="hover:text-[#181818]">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="text-[#181818]">Lelang</span>
      </nav>

      {/* Header VOLT Auctions */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
            VOLT AUCTIONS
          </p>
          <h1 className="mt-2 font-display font-bold text-3xl sm:text-5xl text-[#181818] leading-tight">
            Barang incaran.<br />
            Harga, kamu tentukan.
          </h1>
          <p className="mt-3 text-sm text-[#6E6E6B] max-w-lg">
            Ikuti lelang elektronik pilihan, ajukan penawaran, dan bawa pulang upgrade berikutnya.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-xs text-[#6E6E6B]">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#181818]" /> Produk terverifikasi
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[#181818]" /> Penawaran transparan
          </span>
        </div>
      </div>

      {/* HERO CARD: LELANG UNGGULAN (LOT #001) */}
      <section className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[#E5E5E2]">
        {/* Kiri: Foto Produk */}
        <div className="lg:col-span-6 relative bg-[#EAE8E3] min-h-[320px]">
          <img
            src={featuredLot.image}
            alt={featuredLot.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-5 left-5 bg-[#DDFD5B] text-[#181818] text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded">
            {featuredLot.badgeText}
          </span>
        </div>

        {/* Kanan: Panel Gelap #181818 sesuai prototype */}
        <div className="lg:col-span-6 bg-[#181818] text-white p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 bg-[#DDFD5B] text-[#181818] text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#181818] animate-pulse" />
                {featuredLot.status}
              </span>
              <span className="text-xs font-mono text-white/60">{featuredLot.lotNumber}</span>
            </div>

            <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl">{featuredLot.name}</h2>
            <p className="mt-1 text-xs text-white/70">{featuredLot.variantInfo}</p>

            <div className="mt-8 pb-6 border-b border-white/15">
              <p className="text-xs text-white/60">Penawaran tertinggi</p>
              <p className="mt-1 font-display font-bold text-3xl sm:text-4xl">
                {formatRupiah(featuredLot.currentBid)}
              </p>
              <p className="mt-1.5 text-xs text-white/60">
                {featuredLot.totalBids} penawaran · Kelipatan {formatRupiah(featuredLot.bidIncrement)}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-xs text-white/60 mb-1">Berakhir dalam</p>
              <div className="flex items-baseline gap-2 font-mono">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold">{featuredTimer.hours}</span>
                  <span className="block text-[9px] text-white/50 tracking-wider">JAM</span>
                </div>
                <span className="text-xl text-white/50">:</span>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold">{featuredTimer.minutes}</span>
                  <span className="block text-[9px] text-white/50 tracking-wider">MENIT</span>
                </div>
                <span className="text-xl text-white/50">:</span>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold">{featuredTimer.secs}</span>
                  <span className="block text-[9px] text-white/50 tracking-wider">DETIK</span>
                </div>
              </div>
              <p className="text-[11px] text-white/50 mt-2">
                Akhir lelang: {featuredLot.endTime}
              </p>
            </div>

            <Link
              to={`/lelang/${featuredLot.slug}`}
              className="inline-flex items-center justify-center gap-2 bg-[#DDFD5B] text-[#181818] text-sm font-semibold px-6 py-4 rounded-xl hover:bg-[#D1F542] transition shrink-0"
            >
              <span>Lihat & ajukan penawaran</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* LELANG LAINNYA YANG SEDANG BERLANGSUNG */}
      <section className="mt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-[#181818]">
              Temukan incaran berikutnya.
            </h2>
            <p className="text-xs text-[#6E6E6B] mt-1">Lelang lainnya yang sedang berlangsung.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#6E6E6B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk lelang..."
              className="w-full bg-[#F5F5F3] rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#181818]"
            />
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5E5E2] mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'semua', label: 'Semua' },
              { id: 'audio', label: 'Audio' },
              { id: 'komputer', label: 'Komputer' },
              { id: 'wearables', label: 'Wearables' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCat(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                  selectedCat === tab.id
                    ? 'bg-[#181818] text-white'
                    : 'bg-[#F5F5F3] text-[#6E6E6B] hover:text-[#181818]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#F5F5F3] rounded-lg px-3 py-2 text-xs text-[#181818] focus:outline-none"
          >
            <option value="segera">Urutkan: Segera berakhir</option>
            <option value="terendah">Bid: Terendah</option>
          </select>
        </div>

        {/* Grid Lot Lainnya */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherLots.map((lot) => (
            <AuctionLotCard key={lot.id} lot={lot} />
          ))}
        </div>

        <div className="mt-4 flex justify-between text-xs text-[#6E6E6B]">
          <span>Menampilkan {otherLots.length} dari 3 lelang lainnya</span>
          <span>Semua harga belum termasuk ongkos kirim.</span>
        </div>
      </section>

      {/* PANDUAN 3 LANGKAH: BID SMART. WIN BETTER. */}
      <section className="mt-20 pt-14 border-t border-[#E5E5E2]">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
          BID SMART. WIN BETTER.
        </p>
        <h2 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-[#181818]">
          Pertama kali ikut lelang?
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: 'Temukan incaranmu',
              desc: 'Masuk ke akun, pilih produk, dan cek kondisi serta waktu berakhirnya.',
            },
            {
              num: '02',
              title: 'Pasang penawaran',
              desc: 'Ajukan nominal sesuai kelipatan. Pantau jika ada penawaran yang lebih tinggi.',
            },
            {
              num: '03',
              title: 'Menang, lalu checkout',
              desc: 'Penawaran tertinggi saat waktu habis menang. Selesaikan pembayaran untuk pengiriman.',
            },
          ].map((step) => (
            <div key={step.num} className="bg-[#F5F5F3] p-6 rounded-2xl">
              <span className="font-display font-bold text-sm text-[#6E6E6B]">{step.num}</span>
              <h3 className="mt-2 font-display font-semibold text-base text-[#181818]">
                {step.title}
              </h3>
              <p className="mt-1.5 text-xs text-[#6E6E6B] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ LELANG */}
      <section className="mt-16 pt-12 border-t border-[#E5E5E2] grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <h2 className="font-display font-bold text-2xl text-[#181818]">Biar makin yakin.</h2>
          <p className="text-sm text-[#6E6E6B] mt-2">
            Jawaban singkat sebelum mulai menawar.
          </p>
          <Link
            to="/hubungi-kami"
            className="mt-4 inline-block text-xs font-medium underline underline-offset-4 text-[#181818]"
          >
            Masih ada pertanyaan? Hubungi kami
          </Link>
        </div>

        <div className="lg:col-span-8 divide-y divide-[#E5E5E2] border-y border-[#E5E5E2]">
          <div className="py-5">
            <h3 className="font-display font-semibold text-base text-[#181818]">
              Apakah semua barang dalam kondisi baru?
            </h3>
            <p className="mt-2 text-sm text-[#6E6E6B]">
              Kondisi setiap produk tercantum di detail lot. Cek deskripsi, kelengkapan, dan informasi garansi sebelum menawar.
            </p>
          </div>
          <div className="py-5">
            <h3 className="font-display font-semibold text-base text-[#181818]">
              Bagaimana pemenang lelang ditentukan?
            </h3>
            <p className="mt-2 text-sm text-[#6E6E6B]">
              Pemilik penawaran tertinggi saat waktu lelang habis menjadi pemenang. Rincian pembayaran dan pengiriman akan muncul di akunmu.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
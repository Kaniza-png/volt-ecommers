import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';

export default function CareHub({ section = 'hub' }) {
  const sidebarLinks = [
    { label: 'Pusat bantuan', to: '/bantuan', key: 'hub' },
    { label: 'Pengiriman & retur', to: '/bantuan/pengiriman-retur', key: 'pengiriman' },
    { label: 'Garansi produk', to: '/bantuan/garansi', key: 'garansi' },
    { label: 'Pertanyaan umum', to: '/bantuan/faq', key: 'faq' },
    { label: 'Hubungi kami', to: '/hubungi-kami', key: 'kontak' },
  ];

  const faqs = [
    {
      q: 'Bagaimana memilih produk yang tepat?',
      a: 'Mulai dari kebutuhan harianmu, lalu jelajahi kategori yang sesuai. Bandingkan fitur, harga, dan pilihan varian di halaman detail produk sebelum menentukan pilihan.',
    },
    {
      q: 'Di mana saya melihat harga dan varian produk?',
      a: 'Harga dan pilihan varian ada di halaman detail produk. Perhatikan konfigurasi atau warna yang dipilih, karena informasi pembelian mengikuti varian tersebut.',
    },
    {
      q: 'Bagaimana mengetahui ongkos kirim?',
      a: 'Cek alamat tujuan dan layanan pengiriman pada ringkasan checkout. Gratis ongkir berlaku untuk pesanan mulai Rp500.000.',
    },
    {
      q: 'Apa yang perlu disiapkan untuk retur?',
      a: 'Siapkan nomor pesanan, dokumentasi kondisi barang, dan kelengkapannya. Hubungi tim VOLT untuk konfirmasi penanganan sebelum mengirim barang kembali.',
    },
    {
      q: 'Bagaimana mengetahui cakupan garansi?',
      a: 'Lihat informasi garansi di detail dan dokumen produk. Jenis, masa, serta cakupan perlindungan dapat berbeda. Siapkan bukti pembelian jika membutuhkan bantuan.',
    },
    {
      q: 'Bagaimana mengikuti lelang elektronik?',
      a: 'Buka halaman Lelang dan pilih lot yang ingin kamu ikuti. Baca kondisi produk, batas waktu, kelipatan penawaran, dan ketentuan yang ditampilkan pada lot tersebut.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#6E6E6B] mb-8">
        <Link to="/" className="hover:text-[#181818]">Beranda</Link>
        <span className="mx-2">/</span>
        <Link to="/bantuan" className="hover:text-[#181818]">Bantuan</Link>
        {section !== 'hub' && (
          <>
            <span className="mx-2">/</span>
            <span className="text-[#181818] capitalize">{section.replace('-', ' ')}</span>
          </>
        )}
      </nav>

      {/* HUB UTAMA (/bantuan) */}
      {section === 'hub' && (
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
            VOLT CARE
          </p>
          <h1 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-[#181818]">
            Butuh bantuan? Mulai dari sini.
          </h1>
          <p className="mt-2 text-sm text-[#6E6E6B]">
            Temukan panduan sebelum dan setelah membeli. Pilih topik yang paling sesuai dengan kebutuhanmu.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Pengiriman & retur',
                desc: 'Dari pesanan dikirim sampai bantuan saat barang tiba.',
                tags: 'Alur pengiriman · Persiapan retur',
                to: '/bantuan/pengiriman-retur',
              },
              {
                title: 'Garansi produk',
                desc: 'Kenali cakupan perlindungan dan cara meminta bantuan.',
                tags: 'Informasi garansi · Persiapan klaim',
                to: '/bantuan/garansi',
              },
              {
                title: 'Pertanyaan umum',
                desc: 'Jawaban singkat untuk pertanyaan yang sering muncul.',
                tags: 'Memilih produk · Pesanan · Lelang',
                to: '/bantuan/faq',
              },
              {
                title: 'Hubungi kami',
                desc: 'Belum menemukan jawabannya? Mulai percakapan.',
                tags: 'Email bantuan · Pertanyaan produk',
                to: '/hubungi-kami',
              },
            ].map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="group bg-[#F5F5F3] rounded-2xl p-8 flex flex-col justify-between hover:bg-[#EAEAE6] transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display font-bold text-xl text-[#181818]">{card.title}</h2>
                  <ArrowUpRight className="w-5 h-5 text-[#6E6E6B] group-hover:text-[#181818]" />
                </div>
                <p className="mt-2 text-sm text-[#6E6E6B]">{card.desc}</p>
                <p className="mt-6 text-xs font-medium text-[#181818]">{card.tags}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SUB-HALAMAN DENGAN SIDEBAR BANTUAN VOLT */}
      {section !== 'hub' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sidebar Menu */}
          <aside className="lg:col-span-3 bg-[#F5F5F3] rounded-2xl p-5">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B] mb-3 px-3">
              BANTUAN VOLT
            </p>
            <nav className="space-y-1">
              {sidebarLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block px-3 py-2.5 rounded-lg text-sm transition ${
                    section === item.key
                      ? 'bg-white font-medium text-[#181818] shadow-sm'
                      : 'text-[#6E6E6B] hover:text-[#181818]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Konten Utama */}
          <div className="lg:col-span-9">
            {section === 'pengiriman' && (
              <div className="space-y-10">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
                    PANDUAN BELANJA
                  </p>
                  <h1 className="mt-2 font-display font-bold text-3xl text-[#181818]">
                    Pengiriman & retur
                  </h1>
                  <p className="mt-2 text-sm text-[#6E6E6B]">
                    Panduan menerima pesanan dan langkah awal saat ada kendala.
                  </p>
                </div>

                <div>
                  <h2 className="font-display font-semibold text-xl mb-4">Dari checkout ke pintumu.</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: 'Cek alamat & layanan', desc: 'Pastikan alamat lengkap dan kontak penerima sudah sesuai.' },
                      { title: 'Lihat estimasi & ongkir', desc: 'Cek pilihan layanan dan biaya pada ringkasan checkout.' },
                      { title: 'Pantau pengiriman', desc: 'Gunakan informasi pelacakan yang tersedia pada pesanan.' },
                    ].map((s, i) => (
                      <div key={i} className="bg-[#F5F5F3] p-5 rounded-xl">
                        <h3 className="font-display font-semibold text-sm">{s.title}</h3>
                        <p className="text-xs text-[#6E6E6B] mt-1.5 leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="font-display font-semibold text-xl mb-4">Ada kendala saat barang tiba?</h2>
                  <div className="space-y-3">
                    {[
                      { num: '01', title: 'Dokumentasikan kondisinya', desc: 'Simpan foto atau video produk, kemasan, label, dan bagian yang perlu diperiksa.' },
                      { num: '02', title: 'Hubungi tim VOLT', desc: 'Siapkan nomor pesanan, nama produk, dan ringkasan kendala.' },
                      { num: '03', title: 'Ikuti arahan penanganan', desc: 'Konfirmasikan kelayakan, alamat tujuan, dan pengiriman retur dengan tim terlebih dahulu.' },
                    ].map((step) => (
                      <div key={step.num} className="bg-[#F5F5F3] p-5 rounded-xl flex gap-4">
                        <span className="font-display font-bold text-sm text-[#6E6E6B]">{step.num}</span>
                        <div>
                          <h3 className="font-display font-semibold text-sm">{step.title}</h3>
                          <p className="text-xs text-[#6E6E6B] mt-1">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {section === 'garansi' && (
              <div className="space-y-10">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
                    PANDUAN BELANJA
                  </p>
                  <h1 className="mt-2 font-display font-bold text-3xl text-[#181818]">
                    Garansi produk
                  </h1>
                  <p className="mt-2 text-sm text-[#6E6E6B]">
                    Kenali perlindungan perangkatmu dan persiapan sebelum mengajukan bantuan.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Jenis garansi', desc: 'Cek penyedia dan jenis garansi yang tercantum pada detail produk.' },
                    { title: 'Masa perlindungan', desc: 'Simpan bukti pembelian dan lihat periode garansi pada dokumen produk.' },
                    { title: 'Cakupan layanan', desc: 'Pelajari bagian yang ditanggung dan pengecualian sebelum mengajukan layanan.' },
                  ].map((g, i) => (
                    <div key={i} className="bg-[#F5F5F3] p-5 rounded-xl">
                      <h3 className="font-display font-semibold text-sm">{g.title}</h3>
                      <p className="text-xs text-[#6E6E6B] mt-1.5 leading-relaxed">{g.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h2 className="font-display font-semibold text-xl">Siapkan pengajuan garansimu.</h2>
                  {[
                    { num: '01', title: 'Periksa bukti pembelian', desc: 'Siapkan nomor pesanan, bukti transaksi, dan informasi garansi yang kamu miliki.' },
                    { num: '02', title: 'Catat kendala perangkat', desc: 'Jelaskan gejala, waktu terjadinya, dan sertakan foto atau video bila relevan.' },
                    { num: '03', title: 'Hubungi bantuan sebelum mengirim', desc: 'Konfirmasikan alur pemeriksaan dan tujuan pengiriman dengan tim VOLT.' },
                  ].map((step) => (
                    <div key={step.num} className="bg-[#F5F5F3] p-5 rounded-xl flex gap-4">
                      <span className="font-display font-bold text-sm text-[#6E6E6B]">{step.num}</span>
                      <div>
                        <h3 className="font-display font-semibold text-sm">{step.title}</h3>
                        <p className="text-xs text-[#6E6E6B] mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === 'faq' && (
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
                  JAWABAN SINGKAT UNTUKMU
                </p>
                <h1 className="mt-2 font-display font-bold text-3xl text-[#181818]">
                  Pertanyaan umum
                </h1>
                <p className="mt-2 text-sm text-[#6E6E6B] mb-8">
                  Mulai dari memilih produk sampai bantuan setelah pembelian.
                </p>

                <div className="divide-y divide-[#E5E5E2] border-y border-[#E5E5E2]">
                  {faqs.map((item, idx) => (
                    <div key={idx} className="py-5">
                      <h3 className="font-display font-semibold text-base text-[#181818]">
                        {item.q}
                      </h3>
                      <p className="mt-2 text-sm text-[#6E6E6B] leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === 'kontak' && (
              <div className="space-y-8">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
                    LET'S TALK
                  </p>
                  <h1 className="mt-2 font-display font-bold text-3xl text-[#181818]">
                    Ada yang bisa kami bantu?
                  </h1>
                  <p className="mt-2 text-sm text-[#6E6E6B]">
                    Ceritakan kebutuhan atau kendalamu. Sertakan detail yang relevan supaya percakapannya lebih jelas.
                  </p>
                </div>

                <div className="bg-[#F5F5F3] rounded-2xl p-8">
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
                    KIRIM EMAIL KE
                  </p>
                  <p className="mt-1 font-display font-bold text-2xl text-[#181818]">hello@volt.id</p>
                  <a
                    href="mailto:hello@volt.id"
                    className="mt-5 inline-flex items-center gap-2 bg-[#181818] text-white text-xs font-medium px-5 py-3 rounded-lg hover:bg-black/85 transition"
                  >
                    <Mail className="w-4 h-4" />
                    Buka aplikasi email
                  </a>
                  <p className="mt-4 text-xs text-[#6E6E6B]">
                    Jangan kirim kata sandi, OTP, atau data kartu pembayaran melalui email.
                  </p>
                </div>

                <div>
                  <h2 className="font-display font-semibold text-lg mb-4">Biar lebih mudah dibantu.</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { num: '01', title: 'Nomor pesanan', desc: 'Untuk pertanyaan terkait transaksi.' },
                      { num: '02', title: 'Nama produk & varian', desc: 'Sebutkan perangkat yang dimaksud.' },
                      { num: '03', title: 'Ringkasan & dokumentasi', desc: 'Jelaskan kendala dan lampirkan foto jika perlu.' },
                    ].map((b) => (
                      <div key={b.num} className="bg-[#F5F5F3] p-5 rounded-xl">
                        <span className="text-xs font-bold text-[#6E6E6B]">{b.num}</span>
                        <h3 className="font-display font-semibold text-sm mt-1">{b.title}</h3>
                        <p className="text-xs text-[#6E6E6B] mt-1">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
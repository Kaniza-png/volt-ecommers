import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E5E2] pt-16 pb-10 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-[#E5E5E2]">
          {/* Kolom Brand */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link to="/" className="font-display font-bold text-xl tracking-tight text-[#181818]">
                VOLT.
              </Link>
              <p className="mt-3 text-sm text-[#6E6E6B] leading-relaxed">
                Teknologi pilihan.<br />
                Untuk hidup yang terus bergerak.
              </p>
            </div>
            <div className="mt-8 text-xs text-[#6E6E6B] flex items-center gap-2">
              <a href="#instagram" className="hover:text-[#181818]">Instagram</a>
              <span>/</span>
              <a href="#tiktok" className="hover:text-[#181818]">TikTok</a>
              <span>/</span>
              <a href="#youtube" className="hover:text-[#181818]">YouTube</a>
            </div>
          </div>

          {/* Kolom Jelajahi */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#181818] mb-4">
              Jelajahi
            </h4>
            <ul className="space-y-2.5 text-sm text-[#6E6E6B]">
              <li><Link to="/produk" className="hover:text-[#181818]">Semua produk</Link></li>
              <li><Link to="/kategori/audio" className="hover:text-[#181818]">Audio & suara</Link></li>
              <li><Link to="/kategori/komputer" className="hover:text-[#181818]">Laptop & komputer</Link></li>
              <li><Link to="/kategori/smart-living" className="hover:text-[#181818]">Smart living</Link></li>
            </ul>
          </div>

          {/* Kolom Bantuan */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#181818] mb-4">
              Bantuan
            </h4>
            <ul className="space-y-2.5 text-sm text-[#6E6E6B]">
              <li><Link to="/bantuan/pengiriman-retur" className="hover:text-[#181818]">Pengiriman & retur</Link></li>
              <li><Link to="/bantuan/garansi" className="hover:text-[#181818]">Garansi produk</Link></li>
              <li><Link to="/bantuan/faq" className="hover:text-[#181818]">Pertanyaan umum</Link></li>
              <li><Link to="/hubungi-kami" className="hover:text-[#181818]">Hubungi kami</Link></li>
            </ul>
          </div>

          {/* Kolom Tentang VOLT */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#181818] mb-4">
              Tentang VOLT
            </h4>
            <ul className="space-y-2.5 text-sm text-[#6E6E6B]">
              <li><Link to="/tentang/cerita-kami" className="hover:text-[#181818]">Cerita kami</Link></li>
              <li><Link to="/tentang/jurnal" className="hover:text-[#181818]">Jurnal</Link></li>
              <li><Link to="/tentang/jadi-partner" className="hover:text-[#181818]">Jadi partner</Link></li>
              <li><a href="mailto:hello@volt.id" className="hover:text-[#181818]">hello@volt.id</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E6E6B] gap-4">
          <p>© 2026 VOLT. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Link to="/bantuan" className="hover:text-[#181818]">Kebijakan privasi</Link>
            <span>/</span>
            <Link to="/bantuan" className="hover:text-[#181818]">Syarat & ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
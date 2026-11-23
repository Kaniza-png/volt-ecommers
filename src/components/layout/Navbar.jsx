import { Link, NavLink } from 'react-router-dom';
import { Search, User, ShoppingBag } from 'lucide-react';

export default function Navbar({ cartCount = 0 }) {
  const navItems = [
    { label: 'Semua produk', to: '/produk' },
    { label: 'Audio', to: '/kategori/audio' },
    { label: 'Komputer', to: '/kategori/komputer' },
    { label: 'Smart living', to: '/kategori/smart-living' },
    { label: 'Promo', to: '/promo' },
    { label: 'Lelang', to: '/lelang' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#E5E5E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Kiri: Logo + Tagline */}
        <div className="flex items-center gap-4">
          <Link to="/" className="font-display font-bold text-xl tracking-tight text-[#181818]">
            VOLT.
          </Link>
          <span className="hidden xl:inline-block text-xs text-[#6E6E6B] border-l border-[#E5E5E2] pl-4">
            Elektronik, lebih dekat.
          </span>
        </div>

        {/* Tengah: Menu Navigasi */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? 'text-[#181818] font-medium'
                    : 'text-[#6E6E6B] hover:text-[#181818]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Kanan: Search, Akun, Keranjang */}
        <div className="flex items-center gap-5 text-[#181818]">
          <Link to="/produk?focus=search" aria-label="Cari produk" className="hover:opacity-70 transition">
            <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </Link>
          <Link to="/akun" aria-label="Akun" className="hover:opacity-70 transition">
            <User className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </Link>
          <Link to="/keranjang" aria-label="Keranjang" className="relative hover:opacity-70 transition">
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#DDFD5B] text-[#181818] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
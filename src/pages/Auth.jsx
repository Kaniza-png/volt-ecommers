import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, LayoutDashboard, Package, Gavel } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatRupiah } from '../data/mockData';

export default function Auth({ orders = [] }) {
  const { user, login, register, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const logged = await login(email, password);
        if (logged.role === 'admin') navigate('/admin');
      } else {
        await register(fullName, email, password);
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memproses akun.');
    } finally {
      setLoading(false);
    }
  };

  // TAMPILAN JIKA SUDAH LOGIN (PROFIL PENGGUNA)
  if (user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#E5E5E2]">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
              AKUN VOLT · {user.role.toUpperCase()}
            </p>
            <h1 className="mt-1 font-display font-bold text-3xl text-[#181818]">
              Halo, {user.fullName}.
            </h1>
            <p className="text-sm text-[#6E6E6B] mt-0.5">{user.email}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 bg-[#DDFD5B] text-[#181818] text-xs font-semibold px-5 py-3 rounded-lg hover:bg-[#D1F542] transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                Buka Dashboard Admin
              </Link>
            )}
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 border border-[#E5E5E2] text-xs font-medium px-4 py-3 rounded-lg hover:bg-[#F5F5F3] transition"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </div>

        {/* Ringkasan Aktivitas */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#F5F5F3] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-display font-semibold mb-4">
              <Package className="w-4 h-4" />
              <span>Pesanan terbaru</span>
            </div>
            {orders.length === 0 ? (
              <p className="text-xs text-[#6E6E6B]">
                Belum ada riwayat pesanan. Mulai belanja di katalog VOLT.
              </p>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.orderNumber} className="bg-white p-4 rounded-xl border border-[#E5E5E2] flex justify-between text-xs">
                    <div>
                      <p className="font-semibold text-[#181818]">{ord.orderNumber}</p>
                      <p className="text-[#6E6E6B] mt-0.5">{ord.status}</p>
                    </div>
                    <span className="font-bold">{formatRupiah(ord.total)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#F5F5F3] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-display font-semibold mb-4">
              <Gavel className="w-4 h-4" />
              <span>Pantau lelang aktif</span>
            </div>
            <p className="text-xs text-[#6E6E6B] mb-4">
              Cek posisi penawaranmu pada lot lelang yang sedang berlangsung.
            </p>
            <Link
              to="/lelang"
              className="inline-block bg-[#181818] text-white text-xs font-medium px-5 py-2.5 rounded-lg"
            >
              Lihat ruang lelang
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // TAMPILAN BELUM LOGIN (SESUAI PROTOTYPE HALAMAN 2)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-[#6E6E6B] mb-8">
        <Link to="/" className="hover:text-[#181818]">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="text-[#181818]">Akun</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Kiri: Editorial Copy sesuai Prototype */}
        <div className="lg:col-span-6 bg-[#F5F5F3] rounded-2xl p-8 sm:p-12 flex flex-col justify-between min-h-[440px]">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
              YOUR VOLT, YOUR EVERYDAY
            </p>
            <h1 className="mt-4 font-display font-bold text-3xl sm:text-5xl text-[#181818] leading-tight">
              Satu akun.<br />
              Banyak upgrade.
            </h1>
            <p className="mt-4 text-sm text-[#6E6E6B] max-w-md leading-relaxed">
              Kelola pesanan, simpan pilihan favorit, dan pantau penawaran lelangmu. Semua pilihanmu, lebih dekat.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-[#E5E5E2] flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setEmail('pelanggan@volt.id');
                setPassword('volt1234');
              }}
              className="text-xs bg-white border border-[#E5E5E2] px-3 py-1.5 rounded-lg hover:border-[#181818]"
            >
              Isi Demo Pelanggan
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@volt.id');
                setPassword('admin1234');
              }}
              className="text-xs bg-[#DDFD5B] text-[#181818] font-medium px-3 py-1.5 rounded-lg hover:bg-[#D1F542]"
            >
              Isi Demo Admin
            </button>
          </div>
        </div>

        {/* Kanan: Form Masuk / Daftar */}
        <div className="lg:col-span-6 max-w-md w-full mx-auto lg:mx-0">
          <div className="flex gap-6 border-b border-[#E5E5E2] mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`pb-3 text-sm font-medium border-b-2 transition ${
                mode === 'login'
                  ? 'border-[#181818] text-[#181818]'
                  : 'border-transparent text-[#6E6E6B]'
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`pb-3 text-sm font-medium border-b-2 transition ${
                mode === 'register'
                  ? 'border-[#181818] text-[#181818]'
                  : 'border-transparent text-[#6E6E6B]'
              }`}
            >
              Daftar akun
            </button>
          </div>

          <h2 className="font-display font-bold text-2xl text-[#181818]">
            {mode === 'login' ? 'Selamat datang kembali.' : 'Buat akun VOLT baru.'}
          </h2>
          <p className="text-xs text-[#6E6E6B] mt-1 mb-6">
            {mode === 'login'
              ? 'Masuk ke akun VOLT untuk melanjutkan.'
              : 'Lengkapi data diri untuk mulai belanja dan mengikuti lelang.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium mb-1.5">Nama lengkap</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama lengkapmu"
                  className="w-full bg-[#F5F5F3] border border-[#E5E5E2] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#181818]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium mb-1.5">Alamat email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-[#F5F5F3] border border-[#E5E5E2] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#181818]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5">Kata sandi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full bg-[#F5F5F3] border border-[#E5E5E2] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#181818]"
              />
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#181818] text-white text-sm font-medium py-3.5 px-6 rounded-lg hover:bg-black/85 transition"
            >
              {loading ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Daftar sekarang'}
            </button>
          </form>

          <div className="mt-8">
            <Link
              to="/produk"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#6E6E6B] hover:text-[#181818]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali jelajahi produk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
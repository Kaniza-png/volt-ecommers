import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function About({ section = 'tentang' }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#6E6E6B] mb-8">
        <Link to="/" className="hover:text-[#181818]">Beranda</Link>
        <span className="mx-2">/</span>
        <Link to="/tentang" className="hover:text-[#181818]">Tentang VOLT</Link>
        {section !== 'tentang' && (
          <>
            <span className="mx-2">/</span>
            <span className="text-[#181818] capitalize">{section.replace('-', ' ')}</span>
          </>
        )}
      </nav>

      {/* /tentang */}
      {section === 'tentang' && (
        <div className="space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
                LESS NOISE. MORE EVERYDAY.
              </p>
              <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl text-[#181818] leading-tight">
                Teknologi pilihan.<br />Hidup lebih dekat.
              </h1>
              <p className="mt-4 text-sm text-[#6E6E6B] leading-relaxed max-w-md">
                Kami ingin membuat pilihan teknologi terasa lebih sederhana. Bukan sekadar spesifikasi, tapi manfaat yang dekat dengan harimu.
              </p>
              <Link
                to="/tentang/cerita-kami"
                className="mt-6 inline-block bg-[#181818] text-white text-xs font-medium px-6 py-3.5 rounded-lg"
              >
                Kenali cerita kami
              </Link>
            </div>
            <div className="lg:col-span-6">
              <img
                src="https://placehold.co/900x600/EAE8E3/181818?text=VOLT+Workspace"
                alt="VOLT Workspace"
                className="rounded-2xl w-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Cerita kami', desc: 'Kenapa kami memilih untuk lebih dekat.', to: '/tentang/cerita-kami' },
              { title: 'Jurnal', desc: 'Catatan kecil untuk upgrade keseharianmu.', to: '/tentang/jurnal' },
              { title: 'Jadi partner', desc: 'Buka percakapan. Bangun hal baik bersama.', to: '/tentang/jadi-partner' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group bg-[#F5F5F3] rounded-2xl p-8 hover:bg-[#EAEAE6] transition"
              >
                <div className="flex justify-between items-start">
                  <h2 className="font-display font-bold text-xl">{item.title}</h2>
                  <ArrowUpRight className="w-5 h-5 text-[#6E6E6B] group-hover:text-[#181818]" />
                </div>
                <p className="mt-2 text-sm text-[#6E6E6B]">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* /tentang/cerita-kami */}
      {section === 'cerita-kami' && (
        <div className="space-y-12 max-w-4xl">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
              CERITA KAMI
            </p>
            <h1 className="mt-3 font-display font-bold text-4xl text-[#181818] leading-tight">
              Teknologi seharusnya membantu. Bukan membingungkan.
            </h1>
            <p className="mt-4 text-base text-[#6E6E6B] leading-relaxed">
              Di antara begitu banyak pilihan, kami memilih untuk kembali ke satu pertanyaan sederhana: apa yang benar-benar berguna untuk harimu? Dari pertanyaan itu, cara kami melihat teknologi dimulai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Relevan', desc: 'Mulai dari kebutuhanmu, bukan dari daftar tren.' },
              { title: 'Jelas', desc: 'Bantu memahami pilihan, bukan menambah kebingungan.' },
              { title: 'Dekat', desc: 'Tetap membuka percakapan, bahkan setelah kamu memilih.' },
            ].map((val) => (
              <div key={val.title} className="bg-[#F5F5F3] p-6 rounded-2xl">
                <h2 className="font-display font-bold text-lg">{val.title}</h2>
                <p className="text-sm text-[#6E6E6B] mt-2">{val.desc}</p>
              </div>
            ))}
          </div>

          <Link
            to="/produk"
            className="inline-block bg-[#181818] text-white text-xs font-medium px-6 py-3.5 rounded-lg"
          >
            Jelajahi koleksi
          </Link>
        </div>
      )}

      {/* /tentang/jurnal */}
      {section === 'jurnal' && (
        <div className="space-y-12">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
              JURNAL VOLT
            </p>
            <h1 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-[#181818]">
              Sedikit wawasan. Banyak manfaat.
            </h1>
            <p className="mt-2 text-sm text-[#6E6E6B]">
              Panduan memilih, menikmati, dan merawat teknologi dengan lebih sadar.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                tag: 'PANDUAN MEMILIH',
                title: 'Mulai dari cara kerjamu.',
                body: 'Mulai dari aplikasi yang paling sering kamu buka. Untuk dokumen, rapat, atau riset, utamakan kenyamanan layar dan kemudahan berpindah pekerjaan. Bandingkan RAM, penyimpanan, dan konektivitas dengan kebutuhanmu.',
              },
              {
                tag: 'AUDIO & KESEHARIAN',
                title: 'Suara yang sesuai ruangmu.',
                body: 'Headphones memberi pengalaman mendengar yang lebih personal. Speaker lebih cocok saat kamu ingin berbagi suara atau mengisi suasana ruangan. Pertimbangkan tempat pemakaian dan kenyamanan.',
              },
              {
                tag: 'PERAWATAN PERANGKAT',
                title: 'Rutinitas kecil, perangkat terawat.',
                body: 'Ikuti petunjuk perawatan dari produsen. Matikan perangkat sebelum membersihkan dan gunakan bahan yang sesuai untuk permukaannya. Simpan perangkat di tempat yang aman dan hindari cairan.',
              },
            ].map((post) => (
              <article key={post.title} className="bg-[#F5F5F3] rounded-2xl p-8">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
                  {post.tag}
                </p>
                <h2 className="mt-2 font-display font-bold text-2xl text-[#181818]">{post.title}</h2>
                <p className="mt-3 text-sm text-[#6E6E6B] leading-relaxed max-w-3xl">{post.body}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* /tentang/jadi-partner */}
      {section === 'jadi-partner' && (
        <div className="space-y-10 max-w-4xl">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6E6E6B]">
              GROW SOMETHING GOOD
            </p>
            <h1 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-[#181818]">
              Kolaborasi yang sama-sama berarti.
            </h1>
            <p className="mt-3 text-sm text-[#6E6E6B] leading-relaxed">
              Punya produk, ide, atau komunitas yang sejalan? Mari buka percakapan tentang cara menghadirkan teknologi yang lebih relevan untuk keseharian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Brand & distributor', desc: 'Kenalkan produk dan pendekatan yang ingin kamu bawa.' },
              { title: 'Komunitas & kreator', desc: 'Bagikan ide konten, aktivitas, atau percakapan yang bermanfaat.' },
              { title: 'Bisnis & organisasi', desc: 'Ceritakan kebutuhan perangkat atau rencana kolaborasimu.' },
            ].map((p) => (
              <div key={p.title} className="bg-[#F5F5F3] p-6 rounded-2xl">
                <h2 className="font-display font-semibold text-base">{p.title}</h2>
                <p className="text-xs text-[#6E6E6B] mt-2 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#F5F5F3] p-8 rounded-2xl">
            <h2 className="font-display font-bold text-xl">Punya ide? Kami ingin mendengarnya.</h2>
            <p className="text-sm text-[#6E6E6B] mt-1">
              Kirim perkenalan dan rencana kolaborasimu ke <span className="font-medium text-[#181818]">hello@volt.id</span>.
            </p>
            <a
              href="mailto:hello@volt.id?subject=Kolaborasi%20VOLT"
              className="mt-5 inline-block bg-[#181818] text-white text-xs font-medium px-6 py-3.5 rounded-lg"
            >
              Mulai percakapan
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
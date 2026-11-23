import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { formatRupiah } from '../../data/mockData';

export default function ProductCard({ product, onQuickAdd }) {
  return (
    <div className="group flex flex-col">
      {/* Image Box */}
      <div className="relative aspect-square bg-[#F5F5F3] rounded-xl overflow-hidden mb-4">
        <Link to={`/produk/${product.slug}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        </Link>

        {/* Badge kiri atas */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded ${
              product.badge === '-25%'
                ? 'bg-[#DDFD5B] text-[#181818]'
                : 'bg-white text-[#181818]'
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info Produk */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <Link
            to={`/produk/${product.slug}`}
            className="font-display font-semibold text-base text-[#181818] hover:underline"
          >
            {product.name}
          </Link>
          <p className="text-xs text-[#6E6E6B] mt-0.5 line-clamp-1">{product.tagline}</p>
        </div>

        {/* Tombol Tambah Cepat (+) */}
        <button
          type="button"
          onClick={() => onQuickAdd && onQuickAdd(product)}
          title="Tambah ke keranjang"
          className="w-8 h-8 rounded-full border border-[#E5E5E2] flex items-center justify-center text-[#181818] hover:bg-[#181818] hover:text-white transition shrink-0"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Harga */}
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-sm font-semibold text-[#181818]">{formatRupiah(product.price)}</span>
        {product.originalPrice && (
          <span className="text-xs text-[#6E6E6B] line-through">
            {formatRupiah(product.originalPrice)}
          </span>
        )}
      </div>
    </div>
  );
}
"use client";

import { useApp } from "@/context/AppContext";
import { Heart, Eye, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookCatalog() {
  const { books, wishlist, toggleWishlist, purchasedBooks } = useApp();
  const router = useRouter();

  const approvedBooks = books.filter((b: any) => b.status === "approved");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {approvedBooks.map((book: any) => {
        const isLiked = wishlist?.includes(book.id);
        
        // PENTING: Cek apakah ID buku ini ada di dalam daftar buku yang sudah dibeli
        const isOwned = purchasedBooks?.includes(book.id);

        return (
          <div key={book.id} className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm relative flex flex-col justify-between">
            
            {/* Tombol Hati */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(book.id);
              }}
              className="absolute top-6 right-6 z-10 p-2 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl shadow-sm hover:scale-105 transition-all text-slate-400"
            >
              <Heart className={`w-4 h-4 ${isLiked ? "text-red-500 fill-red-500" : ""}`} />
            </button>

            {/* Gambar Cover */}
            <div className="w-full aspect-[3/4] bg-slate-800 rounded-xl overflow-hidden">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            </div>

            {/* Info & Tombol Aksi Dinamis */}
            <div className="mt-4 space-y-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">{book.genre}</span>
              <h3 className="font-bold text-xs text-white line-clamp-1">{book.title}</h3>
              <p className="text-[11px] text-slate-400">Oleh: {book.author}</p>
              
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 mt-2">
                {isOwned ? (
                  // KONDISI SUDAH BELI: Sembunyikan harga, langsung kasih akses baca
                  <>
                    <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">Milik Anda</span>
                    <button
                      onClick={() => router.push("/library")}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[11px] font-bold transition-all flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3" /> Baca
                    </button>
                  </>
                ) : (
                  // KONDISI BELUM BELI: Tampilkan harga normal dan tombol detail
                  <>
                    <span className="text-xs font-black text-emerald-400">Rp {book.price.toLocaleString("id-ID")}</span>
                    <button
                      onClick={() => router.push(`/book/${book.id}`)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-[11px] font-bold transition-all flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Detail
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
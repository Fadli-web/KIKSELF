"use client";

import { useApp } from "@/context/AppContext";
import { Heart, ShoppingCart, Trash2, ArrowLeft, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const { books, wishlist, toggleWishlist, toggleCart, cart, purchasedBooks } = useApp();
  const router = useRouter();

  const favoriteBooks = books.filter((b: any) => wishlist?.includes(b.id));

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 min-h-screen text-slate-100">
      
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-red-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-red-500" /> Wishlist Saya
          </h1>
        </div>
        <button onClick={() => router.push("/")} className="text-xs font-bold text-indigo-400 flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali
        </button>
      </div>

      {favoriteBooks.length === 0 ? (
        <div className="text-center py-16 bg-[#111827] border border-slate-800 rounded-2xl p-8 text-slate-400 text-xs">
          Wishlist kosong.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favoriteBooks.map((book: any) => {
            const isInCart = cart?.includes(book.id);
            
            // Proteksi status kepemilikan lisensi buku
            const isOwned = purchasedBooks?.includes(book.id);

            return (
              <div key={book.id} className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <img src={book.cover} className="w-12 h-16 object-cover rounded-lg bg-slate-800 border border-slate-700 flex-shrink-0" alt="" />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{book.title}</h4>
                    <p className="text-[11px] text-slate-400">Oleh: {book.author}</p>
                    <p className="text-xs font-black text-emerald-400 mt-1">
                      {isOwned ? "Sudah Dibeli" : `Rp ${book.price.toLocaleString("id-ID")}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                 
                  <button
                    onClick={() => toggleWishlist(book.id)}
                    className="p-2 bg-slate-900 hover:bg-red-950/40 text-slate-500 hover:text-red-400 border border-slate-800 rounded-xl transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
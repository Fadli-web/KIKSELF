"use client";

import { use, useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, ShoppingCart, Lock, BookOpen } from "lucide-react";

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { books, cart, toggleCart, myLibrary } = useApp();
  const [showSample, setShowSample] = useState(false);

  const book = books.find((b: any) => b.id === id);
  if (!book) return <div className="text-center py-12 text-red-400">Buku tidak ditemukan.</div>;

  const isPurchased = myLibrary.includes(book.id);

  // ================= LOGIKA CUT KONTEN BARU =================
  // Mengambil teks sampel asli, jika kosong beri string kosong
  const fullSampleText = book.sampleText || "";
  
  // Ambil hanya 3 kalimat pertama dari teks sampel agar benar-benar terpotong pendek di awal
  const sentences = fullSampleText.split(".");
  const truncatedSample = sentences.slice(0, 3).join(".") + "...";
  // ==========================================================

  return (
    <div className="space-y-8">
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
      </button>

      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="aspect-[3/4] bg-slate-950 rounded-2xl overflow-hidden shadow-xl">
          <img src={book.cover} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="md:col-span-2 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-[10px] font-bold uppercase tracking-wider">{book.genre}</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">{book.title}</h1>
              <p className="text-sm text-slate-400">Ditulis oleh <span className="text-slate-200 font-semibold">{book.author}</span></p>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" /> {book.rating} 
              <span className="text-slate-500 font-medium text-xs">({book.reviews?.length || 0} ulasan pembeli)</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <h4 className="font-bold text-slate-400 mb-1 uppercase text-[11px] tracking-wider">Sinopsis Buku</h4>
              {book.synopsis}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase text-slate-400 tracking-wider block">Harga Hak Akses</span>
              <span className="text-xl font-black text-emerald-400">
                {isPurchased ? "Milik Anda" : `Rp ${book.price.toLocaleString("id-ID")}`}
              </span>
            </div>
            
            <div className="flex gap-2">
              {!isPurchased && (
                <button onClick={() => setShowSample(true)} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700 text-slate-200 transition-all">
                  Baca Sampel Gratis
                </button>
              )}

              {isPurchased ? (
                <button onClick={() => router.push("/library")} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-bold rounded-xl text-white flex items-center gap-1.5 shadow-lg shadow-indigo-600/20">
                  <BookOpen className="w-4 h-4" /> Mulai Membaca Full
                </button>
              ) : (
                <button onClick={() => toggleCart(book.id)} className={`px-5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${cart.includes(book.id) ? "bg-red-600 text-white" : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"}`}>
                  <ShoppingCart className="w-4 h-4" /> {cart.includes(book.id) ? "Hapus dari Keranjang" : "Beli E-Book"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Konten Viewer Sampel (Modal) */}
      {showSample && !isPurchased && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 md:p-8 space-y-6 max-h-[85vh] overflow-hidden flex flex-col relative shadow-2xl">
            
            <button onClick={() => setShowSample(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center">×</button>
            
            <div className="text-center border-b border-slate-800 pb-4 flex-shrink-0">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-wide">Pratinjau Terbatas (Setengah Bab)</span>
              <h2 className="text-lg font-bold text-white mt-1">{book.title}</h2>
            </div>
            
            {/* Box isi teks yang sudah dicut pendek */}
            <div className="flex-1 overflow-y-auto pr-2 py-2">
              <p className="font-serif text-slate-300 leading-loose text-justify whitespace-pre-line text-sm md:text-base selection:bg-indigo-500 selection:text-white">
                {truncatedSample}
              </p>
            </div>
            
            {/* Box Kunci Pengaman */}
            <div className="bg-indigo-950/40 border border-indigo-900/60 p-4 rounded-xl text-center space-y-2 flex-shrink-0">
              <Lock className="w-5 h-5 text-indigo-400 mx-auto" />
              <p className="text-xs text-slate-400 font-medium">Sisa konten sampel dikunci untuk melindungi hak cipta penulis. Beli lisensi penuh untuk membaca kelanjutan cerita.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
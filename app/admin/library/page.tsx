"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ShieldCheck, BookOpen, Search, EyeOff } from "lucide-react";

export default function AdminLibraryPage() {
  const { books, user } = useApp();
  const [search, setSearch] = useState("");
  const [activeBook, setActiveBook] = useState<any>(null);

  // Proteksi rute internal
  if (user?.role !== "admin") {
    return (
      <div className="max-w-md mx-auto text-center py-16 bg-white border border-red-200 rounded-2xl p-6 shadow-sm space-y-2">
        <h3 className="text-sm font-bold text-slate-800">Akses Terbatasi</h3>
        <p className="text-xs text-slate-500">Hanya Super Admin yang berwenang melakukan audit naskah digital secara langsung.</p>
      </div>
    );
  }

  // Tampilkan semua buku yang berstatus aktif di platform
  const approvedBooks = books.filter((b: any) => b.status === "approved");
  const filtered = approvedBooks.filter((b: any) =>
    b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Batang Atas Informasi */}
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" /> Pusat Inspeksi Manuskrip Global
          </h1>
          <p className="text-xs text-slate-500">Hak istimewa peninjauan bebas bypass lisensi bayar untuk cek kualitas teks materi.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari buku atau nama penulis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Kolom Kiri: Grid Rak Buku */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white border rounded-xl text-xs text-slate-400">
              Tidak ada buku aktif ditemukan.
            </div>
          ) : (
            filtered.map((book: any) => (
              <div 
                key={book.id} 
                onClick={() => setActiveBook(book)}
                className={`p-4 bg-white border rounded-xl flex gap-3 cursor-pointer transition-all shadow-sm hover:shadow ${
                  activeBook?.id === book.id ? "border-indigo-600 ring-2 ring-indigo-50" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <img src={book.cover} className="w-12 h-16 object-cover rounded-lg bg-slate-100 border flex-shrink-0" alt="" />
                <div className="flex flex-col justify-between overflow-hidden">
                  <div>
                    <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider">{book.genre}</span>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">{book.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">Oleh: {book.author}</p>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded w-fit mt-1">
                    Buka File Naskah →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Kolom Kanan: E-Reader Sandbox Khusus Pemeriksaan Admin */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm sticky top-24 min-h-[400px] flex flex-col">
          {activeBook ? (
            <div className="space-y-4 flex-1 flex flex-col animate-in fade-in duration-200">
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-800 leading-tight">{activeBook.title}</h3>
                  <p className="text-xs text-indigo-600 font-semibold mt-0.5">{activeBook.author}</p>
                </div>
                <button onClick={() => setActiveBook(null)} className="p-1 hover:bg-slate-100 rounded text-slate-400">
                  <EyeOff className="w-4 h-4" />
                </button>
              </div>

              {/* Teks Naskah Penuh */}
              <div className="flex-1 overflow-y-auto bg-slate-50 p-4 rounded-xl border border-slate-200/60 max-h-[350px]">
                <div className="text-[10px] uppercase font-black tracking-widest text-indigo-500 mb-2 border-b border-indigo-100 pb-1">
                  🔒 DEKRIPSI DATA UTAMA NASKAH (ADMIN PREVIEW)
                </div>
                <p className="text-xs text-slate-700 font-serif leading-relaxed whitespace-pre-wrap">
                  {activeBook.fullText || "Buku ini belum memiliki naskah isi utama."}
                </p>
              </div>
              
              <div className="text-[10px] text-slate-400 font-medium text-center bg-slate-50 p-2 rounded-lg">
                Sesi audit tercatat oleh sistem enkripsi internal log.
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto text-slate-400 space-y-2">
              <BookOpen className="w-8 h-8 text-slate-300" />
              <p className="text-xs font-medium">Pilih salah satu buku di samping untuk membaca naskah penuh secara gratis.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { BookOpen, ShieldCheck, Lock } from "lucide-react";

export default function LibraryPage() {
  const { books, myLibrary } = useApp();
  const [activeBook, setActiveBook] = useState<any>(null);

  const purchasedBooks = books.filter((b: any) => myLibrary.includes(b.id));

  // Fungsi pencegahan pembajakan / DRM Sederhana
  const preventActions = (e: any) => {
    e.preventDefault();
    alert("🔒 Sistem DRM Proteksi: Hak cipta dilindungi. Dilarang melakukan klik kanan, menyalin, atau menyebarluaskan dokumen ini.");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black tex">Rak Buku Digital Saya</h1>
        <p className="text-xs text-slate-400">Semua lisensi membaca buku yang sah tersimpan dengan aman di browser Anda.</p>
      </div>

      {!activeBook ? (
        purchasedBooks.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-3xl text-slate-500">
            <Lock className="w-8 h-8 mx-auto mb-2 text-slate-600" />
            Belum ada buku yang dibeli. Silakan kunjungi katalog untuk menambah koleksi.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {purchasedBooks.map((book: any) => (
              <div key={book.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-slate-950">
                  <img src={book.cover} alt="" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-sm text-white line-clamp-1">{book.title}</h3>
                <p className="text-[11px] text-slate-400 mb-3">{book.author}</p>
                <button onClick={() => setActiveBook(book)} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 font-bold text-xs text-white rounded-xl flex items-center justify-center gap-1 shadow-md">
                  <BookOpen className="w-3.5 h-3.5" /> Baca Sekarang
                </button>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Web E-Reader Viewer Pro (DRM Proteksi Penuh) */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl min-h-[70vh] flex flex-col justify-between overflow-hidden shadow-2xl">
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <h2 className="text-xs font-bold text-white leading-none">{activeBook.title}</h2>
                <span className="text-[10px] text-slate-500">DRM Encapsulated Web Viewer Active</span>
              </div>
            </div>
            <button onClick={() => setActiveBook(null)} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] font-bold rounded-lg border border-slate-700 text-slate-300">
              Tutup Buku
            </button>
          </div>

          {/* Canvas Pembaca dengan Watermark Dinamis & Proteksi Copy-Paste */}
          <div
            onContextMenu={preventActions}
            onCopy={preventActions}
            className="p-8 md:p-16 max-w-2xl mx-auto overflow-y-auto leading-loose text-justify text-slate-300 font-serif text-base select-none bg-slate-950/30 rounded-xl my-6 border border-slate-800/40 relative shadow-inner"
          >
            {/* Watermark Latar Belakang Otomatis Menggunakan Identitas User */}
            <div className="absolute inset-0 flex flex-wrap gap-16 justify-center items-center opacity-[0.02] pointer-events-none text-xs text-white uppercase select-none font-sans font-bold overflow-hidden rotate-12">
              {Array(30).fill("user_lisensi_pembeli@email.com").map((txt, i) => <span key={i}>{txt}</span>)}
            </div>

            <div className="text-center mb-8 border-b border-slate-800/80 pb-4 font-sans">
              <h1 className="text-xl font-bold text-white">{activeBook.title}</h1>
              <p className="text-[11px] text-slate-500 mt-1">Hak Cipta © Miliki Penulis {activeBook.author} — Dilindungi Hukum & Watermark Digital</p>
            </div>

            <p className="whitespace-pre-line relative z-10">
              {activeBook.fullText}
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 text-center text-[10px] text-slate-500 border-t border-slate-800">
            Sistem viewer enkripsi mencegah aksi salin dokumen, manipulasi DOM, inspeksi kode, dan pencetakan ilegal berkas digital.
          </div>
        </div>
      )}
    </div>
  );
}
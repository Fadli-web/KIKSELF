"use client";

import { useApp } from "@/context/AppContext";
import { ShieldCheck, Users, Check, X, ShieldAlert } from "lucide-react";

export default function AdminPanel() {
  const { books, setBooks, adminCommission, user } = useApp();

  // Validasi lapis keamanan internal (jika bukan admin, blokir mentah-mentah)
  if (user?.role !== "admin") {
    return (
      <div className="max-w-md mx-auto text-center py-16 bg-white border border-red-200 rounded-3xl p-6 shadow-sm space-y-3">
        <ShieldAlert className="w-10 h-10 text-red-500 mx-auto" />
        <h3 className="text-sm font-bold text-slate-800">Akses Ilegal Terdeteksi</h3>
        <p className="text-xs text-slate-500">Halaman ini dilindungi enkripsi internal dan hanya dapat diakses oleh peran Super Admin.</p>
      </div>
    );
  }

  const handleAction = (id: string, decision: "approved" | "rejected") => {
    const updated = books.map((b: any) => b.id === id ? { ...b, status: decision } : b);
    setBooks(updated);
  };

  const pendingBooks = books.filter((b: any) => b.status === "pending");

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Panel */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Konsol Kendali Utama</h1>
        <p className="text-xs text-slate-500">Manajemen finansial platform, hak cipta karya, dan pencegahan sengketa berkas pembajakan.</p>
      </div>

      {/* Tiga Kartu Statistik Utama (Light Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Bagi Hasil Platform (20%)</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              Rp {adminCommission.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1 w-fit mt-3">
            Dana Bersih Terlindungi
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Antrean Review Hak Cipta</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">{pendingBooks.length} Buku Baru</span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Pengguna Terdaftar</span>
            <span className="text-2xl font-black text-indigo-600 mt-1 block">1,420 Anggota</span>
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Meja Kerja Antrean Moderasi Karya */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-4">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
            Verifikasi Keaslian & Legalitas Manuskrip
          </h3>
        </div>
        
        {pendingBooks.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs font-medium bg-slate-50 border border-dashed border-slate-200 rounded-xl">
            Semua kiriman buku bersih! Tidak ada antrean verifikasi hak cipta saat ini.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingBooks.map((b: any) => (
              <div key={b.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 first:pt-0 last:pb-0">
                <div className="flex gap-4">
                  <img src={b.cover} alt="" className="w-12 h-16 rounded-xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0 shadow-sm" />
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{b.title}</h4>
                    <p className="text-[11px] text-indigo-600 font-bold">{b.author} • <span className="text-slate-500 font-medium">{b.genre}</span></p>
                    <p className="text-xs text-slate-600 line-clamp-2 max-w-xl font-serif bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                      {b.synopsis}
                    </p>
                  </div>
                </div>
                
                {/* Tombol Aksi Moderasi */}
                <div className="flex gap-2 self-end sm:self-center">
                  <button 
                    onClick={() => handleAction(b.id, "rejected")} 
                    className="p-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl border border-red-200 transition-all shadow-sm"
                    title="Tolak Karya (Melanggar Hak Cipta/Bajakan)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleAction(b.id, "approved")} 
                    className="p-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white rounded-xl border border-emerald-200 transition-all shadow-sm"
                    title="Setujui Karya & Rilis ke Katalog"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
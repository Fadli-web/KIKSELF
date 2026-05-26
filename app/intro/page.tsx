"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function HomeIntro() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden font-sans">
      
      {/* Efek Cahaya Latar Belakang (Glow) - Disesuaikan untuk mode terang */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-100/60 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-100/60 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Konten Utama */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8 mt-10">
        
        {/* Label Kecil di Atas */}
        <div className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-sm mb-2">
          🚀 Digital Book Future Plan
        </div>

        {/* Headline / Judul Utama */}
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Masa Depan <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Buku Digital</span> <br/> Dimulai Dari Sini.
        </h1>

        {/* Paragraf Penjelasan Singkat */}
        <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
          Kami tidak hanya menyediakan tempat untuk membaca. Kami merancang ekosistem literasi masa depan—sebuah platform cerdas tanpa batas yang menghubungkan penulis hebat dengan pembaca sejati di seluruh dunia.
        </p>

        {/* Tombol Aksi (Call to Action) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button 
            onClick={() => router.push("/register")}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-8 py-4 rounded-xl transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98] uppercase tracking-widest"
          >
            Mulai Membaca
          </button>
          
          <button 
            onClick={() => router.push("/login")}
            className="w-full sm:w-auto bg-white border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-black text-xs px-8 py-4 rounded-xl transition-all active:scale-[0.98] uppercase tracking-widest"
          >
            Masuk ke Akun
          </button>
        </div>

        {/* Statistik / Trust Indicator Bawah */}
        <div className="pt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto border-t border-slate-200 mt-10">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-slate-900">10K+</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Buku Digital</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-slate-900">500+</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Penulis Aktif</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-slate-900">99%</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Akses Aman</p>
          </div>
        </div>

      </div>
    </div>
  );
}   
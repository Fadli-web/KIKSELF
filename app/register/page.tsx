"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, BookOpen, UserCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  
  // State untuk menyimpan data input form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "pembeli", // default role
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi proses registrasi sukses
    setTimeout(() => {
      alert(`Registrasi Berhasil sebagai ${formData.role}! Silakan login.`);
      setLoading(false);
      router.push("/login"); // Redirect ke halaman login setelah sukses
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111827] border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6 animate-in fade-in duration-300">
        
        {/* Header Form */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-white tracking-tight">Buat Akun Baru</h1>
          <p className="text-xs text-slate-400">Daftar sekarang untuk mulai membaca atau menulis buku.</p>
        </div>

        {/* Form Pendaftaran */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input Nama Lengkap */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nama Lengkap</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full bg-[#0f172a] border border-slate-800 text-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Input Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Alamat Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                className="w-full bg-[#0f172a] border border-slate-800 text-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Input Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#0f172a] border border-slate-800 text-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Pilihan Mendaftar Sebagai (Role) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mendaftar Sebagai</label>
            <div className="relative">
              <UserCheck className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-[#0f172a] border border-slate-800 text-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
              >
                <option value="pembeli">Pembeli / Pembaca (Reader)</option>
                <option value="author">Penulis (Author)</option>
              </select>
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </form>

        {/* Divider Garis */}
        <div className="relative flex items-center justify-center py-2">
          <div className="w-full border-t border-slate-800"></div>
        </div>

        {/* Footer Link Kembali ke Login */}
        <p className="text-center text-[11px] text-slate-500 font-medium">
          Sudah memiliki akun?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-indigo-400 font-bold hover:underline transition-all"
          >
            Masuk Di Sini
          </button>
        </p>

      </div>
    </div>
  );
}
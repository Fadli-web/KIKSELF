"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { BookOpen, LogIn, Mail, Lock, Link } from "lucide-react";

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"reader" | "author" | "admin">("reader");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Masukkan email Anda!");

    // Menentukan nama simulasi berdasarkan role pilihan
    let name = "Pembeli Setia";
    if (selectedRole === "author") name = "Arka Pena (Author)";
    if (selectedRole === "admin") name = "Super Admin";

    login(email, selectedRole, name);

    // Redirect otomatis ke page yang sesuai role-nya
    if (selectedRole === "admin") router.push("/admin");
    else if (selectedRole === "author") router.push("/author");
    else router.push("/");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl text-indigo-400 mb-2">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-white">Selamat Datang Kembali</h1>
          <p className="text-xs text-slate-400">Masuk untuk mengakses perpustakaan digital terproteksi DRM</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 grid grid-cols-3 gap-1">
          {(["reader", "author", "admin"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setSelectedRole(r)}
              className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                selectedRole === r 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" 
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {r === "reader" ? "Pembeli" : r === "author" ? "Penulis" : "Admin"}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Alamat Email / Akun Sosial</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs rounded-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-950"
          >
            <LogIn className="w-4 h-4" /> Masuk Sistem
          </button>
        </form>

        {/* Social Logins */}
        <div className="relative flex py-2 items-center text-xs text-slate-600">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-3">Atau masuk dengan</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
           <button onClick={() => router.push("/register")} className="py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 hover:border-slate-700 transition-colors">
            Buat Akun Baru
          </button>
          <button onClick={() => { setEmail("google_user@gmail.com"); setPassword("123456"); }} className="py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 hover:border-slate-700 transition-colors">
            Google
          </button>
          <button onClick={() => { setEmail("sosmed_user@facebook.com"); setPassword("123456"); }} className="py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 hover:border-slate-700 transition-colors">
            Media Sosial
          </button>
        </div>

      </div>
    </div>
  );
}
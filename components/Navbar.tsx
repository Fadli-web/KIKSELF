"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, User, LogOut, ShoppingCart, Heart, Library } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, cart, wishlist } = useApp(); // Ambil wishlist dari global context

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-extrabold text-base tracking-wider text-indigo-500 flex items-center gap-2">
          <BookOpen className="w-6 h-6" /> WE<span className="text-slate-200">BOOK</span>
        </Link>
        
        {/* Navigasi Menu */}
        <nav className="flex items-center gap-1 sm:gap-3">
          
          {/* Menu Pembeli / Reader (Sesuai Mockup) */}
          {user?.role === "reader" && (
            <>
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  pathname === "/" ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Katalog Buku
              </Link>

              {/* TOMBOL WISHLIST PEMBELI BISA DIKLIK */}
              <Link 
                href="/wishlist" 
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  pathname === "/wishlist" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist?.length > 0 ? "text-red-500 fill-red-500" : "text-slate-400"}`} />
                <span>Wishlist</span>
                {wishlist?.length > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link 
                href="/library" 
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  pathname === "/library" ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Rak Saya
              </Link>

              <Link 
                href="/cart" 
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  pathname === "/cart" ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Keranjang</span>
                {cart?.length > 0 && (
                  <span className="bg-indigo-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">{cart.length}</span>
                )}
              </Link>
            </>
          )}

          {/* Menu Penulis */}
          {user?.role === "author" && (
            <Link href="/author" className="flex items-center gap-1.5 px-3 py-2 bg-purple-950/40 border border-purple-800 text-purple-400 rounded-xl text-xs font-bold shadow-sm">
              <User className="w-3.5 h-3.5" /> Dashboard Penulis
            </Link>
          )}

          {/* Menu Khusus Super Admin */}
          {user?.role === "admin" && (
            <div className="flex items-center gap-2">
              <Link href="/admin" className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${pathname === "/admin" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "text-slate-400 hover:text-slate-200"}`}>
                Konsol Utama
              </Link>
              <Link href="/admin/library" className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${pathname === "/admin/library" ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" : "text-slate-400 hover:text-slate-200"}`}>
                <Library className="w-3.5 h-3.5" />
                <span>Cek Semua Buku</span>
              </Link>
            </div>
          )}

          <div className="h-6 w-[1px] bg-slate-800 mx-1 hidden sm:block"></div>
          
          {/* Info User */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block text-right">
              <div className="text-xs font-bold text-slate-200 leading-none">{user?.name || "Pembeli Setia"}</div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">{user?.role || "READER"}</span>
            </div>
            <button
              onClick={() => { logout(); router.push("/login"); }}
              className="p-2 bg-slate-900 hover:bg-red-950/40 text-slate-500 hover:text-red-400 border border-slate-800 hover:border-red-900/50 rounded-xl transition-all shadow-sm"
              title="Keluar"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

        </nav>
      </div>
    </header>
  );
}
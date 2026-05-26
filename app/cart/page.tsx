"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ShoppingBag, Trash2, ArrowLeft, CreditCard } from "lucide-react";

export default function CartPage() {
  const { cart, books, toggleCart, handleCheckout } = useApp();
  const router = useRouter();
  const [method, setMethod] = useState("QRIS");

  const cartItems = books.filter((b: any) => cart.includes(b.id));
  const cartTotal = cartItems.reduce((acc: number, b: any) => acc + b.price, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
        <h3 className="text-sm font-bold text-slate-800">Keranjang Belanja Kosong</h3>
        <p className="text-xs text-slate-500">Silakan jelajahi katalog untuk menemukan e-book premium kesukaan Anda.</p>
        <button onClick={() => router.push("/")} className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-sm">
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
      
      {/* Kolom Daftar Belanjaan */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button onClick={() => router.push("/")} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500"><ArrowLeft className="w-4 h-4" /></button>
          <h1 className="text-lg font-black text-slate-900">Daftar Item Keranjang</h1>
        </div>

        <div className="space-y-3">
          {cartItems.map((book: any) => (
            <div key={book.id} className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <img src={book.cover} className="w-10 h-14 rounded-lg object-cover bg-slate-100 border" alt="" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">{book.title}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Penulis: {book.author}</p>
                  <span className="text-xs font-extrabold text-emerald-600 block mt-0.5">Rp {book.price.toLocaleString("id-ID")}</span>
                </div>
              </div>
              <button onClick={() => toggleCart(book.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Kolom Integrasi Sistem Pembayaran (Payment Gateway) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-5">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-3">
          <CreditCard className="w-4 h-4 text-indigo-600" /> Metode Pembayaran Lokal
        </h3>

        {/* Pilihan Sistem Gerbang Pembayaran Terintegrasi */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {["QRIS", "Virtual Account", "GoPay / OVO", "Transfer Bank"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`p-2.5 rounded-xl font-bold border text-center transition-all ${
                method === m ? "bg-indigo-50 text-indigo-600 border-indigo-300 shadow-inner" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-4 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Subtotal Hak Akses:</span>
            <span className="font-medium text-slate-800">Rp {cartTotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Biaya Layanan ({method}):</span>
            <span className="text-slate-400 font-medium">Rp 0 (Simulasi)</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-700">Total Pembayaran:</span>
            <span className="font-black text-sm text-emerald-600">Rp {cartTotal.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <button 
          onClick={() => { handleCheckout(); router.push("/library"); }} 
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-100 hover:opacity-95 transition-all text-center"
        >
          Konfirmasi & Bayar via {method}
        </button>
      </div>

    </div>
  );
}
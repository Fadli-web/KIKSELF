// "use client";

// import { useState } from "react";
// import { useApp } from "@/context/AppContext";
// import Link from "next/link";
// import { Wallet, CheckCircle2, AlertTriangle, ArrowLeft, Landmark, CreditCard } from "lucide-react";

// export default function WithdrawPage() {
//   // Ambil state saldo global dari context agar singkron
//   const { authorBalance, setAuthorBalance } = useApp();

//   const [payoutAmount, setPayoutAmount] = useState<string>("");
//   const [selectedBank, setSelectedBank] = useState<string>("");
//   const [accountNumber, setAccountNumber] = useState<string>("");
  
//   const [errorStatus, setErrorStatus] = useState<string | null>(null);
//   const [successStatus, setSuccessStatus] = useState<string | null>(null);

//   const MIN_PAYOUT = 50000;  
//   const MAX_PAYOUT = 150000; 

//   const handleWithdrawSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorStatus(null);
//     setSuccessStatus(null);

//     const numericAmount = Number(payoutAmount);

//     // 1. Validasi Kelengkapan Form Bank
//     if (!selectedBank) {
//       setErrorStatus("Silakan pilih bank tujuan pencairan dana.");
//       return;
//     }
//     if (!accountNumber || accountNumber.trim().length < 5) {
//       setErrorStatus("Silakan masukkan nomor rekening tujuan yang valid.");
//       return;
//     }

//     // 2. Validasi Nominal Angka
//     if (!payoutAmount || isNaN(numericAmount) || numericAmount <= 0) {
//       setErrorStatus("Silakan masukkan nominal penarikan yang valid.");
//       return;
//     }
//     if (numericAmount < MIN_PAYOUT) {
//       setErrorStatus(`Batas minimal sekali penarikan adalah Rp ${MIN_PAYOUT.toLocaleString("id-ID")}.`);
//       return;
//     }
//     if (numericAmount > MAX_PAYOUT) {
//       setErrorStatus(`Batas maksimal sekali penarikan adalah Rp ${MAX_PAYOUT.toLocaleString("id-ID")}.`);
//       return;
//     }

//     // 3. Validasi Sisa Dompet
//     if (numericAmount > authorBalance) {
//       setErrorStatus("Saldo Royalti Anda tidak mencukupi untuk melakukan penarikan ini.");
//       return;
//     }

//     // POTONG SALDO UTAMA SECARA GLOBAL
//     setAuthorBalance((prev: number) => prev - numericAmount);
//     setSuccessStatus(`Sukses! Penarikan Rp ${numericAmount.toLocaleString("id-ID")} ke Rekening ${selectedBank} (${accountNumber}) sedang diproses.`);
    
//     // Reset Form Input
//     setPayoutAmount("");
//     setAccountNumber("");
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6 text-slate-200 min-h-screen">
      
//       <Link 
//         href="/author" 
//         className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors group w-fit"
//       >
//         <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> 
//         Kembali ke Dashboard Penulis
//       </Link>

//       <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center justify-between shadow-lg">
//         <div className="space-y-1">
//           <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Total Saldo Tersedia</span>
//           <h2 className="text-3xl font-black text-white font-mono">
//             Rp {authorBalance.toLocaleString("id-ID")},2
//           </h2>
//         </div>
//         <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
//           <Wallet className="w-6 h-6" />
//         </div>
//       </div>

//       <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-md">
//         <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
//           <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
//             <Landmark className="w-4 h-4 text-purple-400" /> Informasi Transfer Bank
//           </h3>
//           <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2.5 py-1 border border-amber-500/20 rounded-lg font-bold">
//             Limit: 50k - 150k
//           </span>
//         </div>

//         <form onSubmit={handleWithdrawSubmit} className="space-y-4">
          
//           {/* Pilihan Bank */}
//           <div className="space-y-1.5">
//             <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pilih Bank Tujuan</label>
//             <select
//               value={selectedBank}
//               onChange={(e) => setSelectedBank(e.target.value)}
//               className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
//             >
//               <option value="">-- Pilih Rekening Bank/E-Wallet --</option>
//               <option value="BCA">Bank Central Asia (BCA)</option>
//               <option value="Mandiri">Bank Mandiri</option>
//               <option value="BNI">Bank Negara Indonesia (BNI)</option>
//               <option value="BRI">Bank Rakyat Indonesia (BRI)</option>
//               <option value="GOPAY">GoPay Wallet</option>
//               <option value="DANA">Dana Wallet</option>
//             </select>
//           </div>

//           {/* Input Rekening */}
//           <div className="space-y-1.5">
//             <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nomor Rekening / No. HP</label>
//             <div className="relative">
//               <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
//               <input
//                 type="text"
//                 placeholder="Masukkan nomor akun rekening bank"
//                 value={accountNumber}
//                 onChange={(e) => setAccountNumber(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
//               />
//             </div>
//           </div>

//           {/* Input Nominal */}
//           <div className="space-y-1.5">
//             <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nominal Penarikan (Rp)</label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 font-mono">Rp</span>
//               <input
//                 type="number"
//                 placeholder="Misal: 70000"
//                 value={payoutAmount}
//                 onChange={(e) => setPayoutAmount(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
//               />
//             </div>
//           </div>

//           {/* Notifikasi Status */}
//           {errorStatus && (
//             <div className="bg-red-950/40 border border-red-900/40 rounded-xl p-3 flex items-center gap-2 text-xs text-red-400">
//               <AlertTriangle className="w-4 h-4 flex-shrink-0" />
//               <p>{errorStatus}</p>
//             </div>
//           )}

//           {successStatus && (
//             <div className="bg-emerald-950/40 border border-emerald-900/40 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-400">
//               <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
//               <p>{successStatus}</p>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-[0.99]"
//           >
//             Ajukan Pencairan Dana
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
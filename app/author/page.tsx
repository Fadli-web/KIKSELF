"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Plus, Wallet, BookMarked, CheckCircle, Clock, XCircle, ImagePlus, Edit, Trash2, X } from "lucide-react";

export default function AuthorDashboard() {
  const { books, setBooks, authorBalance, user } = useApp();
  
  // State form dan mode Edit
  const [form, setForm] = useState({ title: "", genre: "Teknologi", price: "", synopsis: "", sampleText: "", fullText: "", cover: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  if (user?.role !== "author") {
    return <div className="text-center py-12 text-red-500 font-bold text-xs bg-red-50 border border-red-200 rounded-xl max-w-sm mx-auto">Akses Ditolak. Khusus Akun Penulis!</div>;
  }

  // Filter buku agar penulis hanya melihat karyanya sendiri
  const authorBooks = books.filter((b: any) => b.author === user?.name);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, cover: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", genre: "Teknologi", price: "", synopsis: "", sampleText: "", fullText: "", cover: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cover) return alert("Silakan unggah file cover buku Anda terlebih dahulu!");

    if (editingId) {
      // UPDATE: Ubah data buku eksisting berdasarkan ID
      const updatedBooks = books.map((b: any) =>
        b.id === editingId ? { ...b, ...form, price: Number(form.price), status: "pending" } : b
      );
      setBooks(updatedBooks);
      alert("Karya berhasil diperbarui! Karena isinya berubah, buku kembali masuk antrean verifikasi Admin.");
    } else {
      // CREATE: Tambah buku baru
      const newBook = {
        id: Date.now().toString(),
        title: form.title,
        author: user?.name || "Penulis Mandiri",
        genre: form.genre,
        price: Number(form.price) || 0,
        rating: 0,
        reviews: [],
        cover: form.cover,
        synopsis: form.synopsis,
        sampleText: form.sampleText,
        fullText: form.fullText,
        status: "pending"
      };
      setBooks([newBook, ...books]);
      alert("Karya berhasil dikirim ke Admin! Status masuk antrean peninjauan.");
    }
    resetForm();
  };

  // Fungsi untuk menarik data ke form saat tombol Edit ditekan
  const handleEdit = (book: any) => {
    setEditingId(book.id);
    setForm({
      title: book.title,
      genre: book.genre,
      price: book.price.toString(),
      synopsis: book.synopsis,
      sampleText: book.sampleText,
      fullText: book.fullText,
      cover: book.cover
    });
    // Scroll otomatis ke atas (ke arah form)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DELETE: Fungsi Hapus Karya
  const handleDelete = (id: string) => {
    if (confirm("Yakin ingin menghapus karya ini? Buku akan hilang dari katalog secara permanen.")) {
      const filteredBooks = books.filter((b: any) => b.id !== id);
      setBooks(filteredBooks);
      if (editingId === id) resetForm();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Keuangan Penulis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Royalti Pendapatan Bersih (80%)</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">Rp {authorBalance.toLocaleString("id-ID")}</span>
          </div>
          <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-purple-600"><Wallet className="w-5 h-5" /></div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between gap-2 shadow-sm">
          <button onClick={() => alert("Permintaan payout diproses!")} className="w-full py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-100 hover:opacity-95 transition-all">
            Tarik Saldo Royalti (Payout)
          </button>
          <span className="text-[10px] text-slate-400 text-center block">*Proses verifikasi pencairan bank memakan waktu 1x24 jam kerja.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Form Penerbitan & Edit Berkas */}
        <form onSubmit={handleSubmit} className={`lg:col-span-2 bg-white border ${editingId ? 'border-amber-400 shadow-amber-100' : 'border-slate-200 shadow-sm'} p-6 rounded-2xl space-y-4 transition-all relative`}>
          
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className={`font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 ${editingId ? 'text-amber-600' : 'text-slate-700'}`}>
              {editingId ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4 text-purple-600" />} 
              {editingId ? "Mode Edit Karya" : "Ajukan Unggahan Dokumen"}
            </h3>
            {editingId && (
              <button type="button" onClick={resetForm} className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-[10px] font-bold bg-slate-50 px-2 py-1 rounded-lg">
                <X className="w-3 h-3" /> Batal Edit
              </button>
            )}
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-500 font-bold mb-1">Judul Karya</label>
              <input type="text" required value={form.title} onChange={e=>setForm({...form, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-purple-500" placeholder="Contoh: Menguasai Next.js Pro" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Genre Utama</label>
                <select value={form.genre} onChange={e=>setForm({...form, genre: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-semibold">
                  <option>Teknologi</option>
                  <option>Fiksi</option>
                  <option>Bisnis</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Harga Lisensi (Rp)</label>
                <input type="number" required value={form.price} onChange={e=>setForm({...form, price: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-purple-500" placeholder="55000" />
              </div>
            </div>
            
            <div>
              <label className="block text-slate-500 font-bold mb-1">Unggah Cover (Lokal)</label>
              <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-3 bg-slate-50 text-center hover:bg-slate-100/50 transition-colors cursor-pointer overflow-hidden group">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full z-10" />
                {form.cover ? (
                  <div className="flex flex-col items-center justify-center gap-1">
                    <img src={form.cover} alt="Preview" className="h-16 rounded shadow-sm object-cover" />
                    <span className="text-[10px] text-emerald-600 font-bold group-hover:text-emerald-700">Cover Terpasang (Klik untuk ganti)</span>
                  </div>
                ) : (
                  <div className="text-slate-400 space-y-1 py-1">
                    <ImagePlus className="w-5 h-5 mx-auto text-slate-300" />
                    <p className="text-[11px]">Klik pilih file gambar</p>
                  </div>
                )}
              </div>
            </div>


            <div>
              <label className="block text-slate-500 font-bold mb-1">Sinopsis</label>
              <textarea rows={2} required value={form.synopsis} onChange={e=>setForm({...form, synopsis: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-purple-500" placeholder="Deskripsi ringkas pemasaran buku..."></textarea>
            </div>
            <div>
              <label className="block text-slate-500 font-bold mb-1">Konten Pratinjau Gratis (Bab 1)</label>
              <textarea rows={2} required value={form.sampleText} onChange={e=>setForm({...form, sampleText: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-serif focus:outline-none" placeholder="Teks bab awal gratis..."></textarea>
            </div>
            <div>
              <label className="block text-slate-500 font-bold mb-1">Konten Utama Seluruh Isi (DRM)</label>
              <textarea rows={3} required value={form.fullText} onChange={e=>setForm({...form, fullText: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-serif focus:outline-none" placeholder="Isi naskah lengkap..."></textarea>
            </div>
          </div>
          <button type="submit" className={`w-full py-2.5 text-white font-bold text-xs rounded-xl transition-all shadow-sm ${editingId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-purple-600 hover:bg-purple-700'}`}>
            {editingId ? "Simpan Perubahan (Update)" : "Kirim Ajukan Verifikasi Manuskrip"}
          </button>
        </form>

        {/* List Histori Karya Penulis dengan tombol Aksi */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <BookMarked className="w-4 h-4 text-purple-600" /> Daftar Karya Anda
          </h3>
          
          {authorBooks.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">Belum ada karya yang diunggah.</div>
          ) : (
            <div className="space-y-3">
              {authorBooks.map((b: any) => (
                <div key={b.id} className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm group">
                  <div className="flex items-center gap-3 w-full">
                    <img src={b.cover} alt="" className="w-10 h-14 rounded-lg object-cover bg-slate-50 border shadow-sm flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">{b.title}</h4>
                      <span className="text-xs font-extrabold text-slate-500 block mt-0.5">Rp {b.price.toLocaleString("id-ID")}</span>
                      
                      {/* Status Badges */}
                      <div className="mt-1.5">
                        {b.status === "approved" ? (
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5" /> Toko Aktif</span>
                        ) : b.status === "pending" ? (
                          <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 inline-flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> Review Admin</span>
                        ) : (
                          <span className="text-[9px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200 inline-flex items-center gap-1"><XCircle className="w-2.5 h-2.5" /> Ditolak</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tombol Aksi: Edit & Delete */}
                  <div className="flex items-center gap-2 self-end sm:self-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(b)}
                      className="p-2 bg-amber-50 hover:bg-amber-500 text-amber-600 hover:text-white rounded-lg border border-amber-200 hover:border-amber-500 transition-all shadow-sm"
                      title="Edit Data Buku"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(b.id)}
                      className="p-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg border border-red-200 hover:border-red-500 transition-all shadow-sm"
                      title="Hapus Buku"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const INITIAL_BOOKS = [
  {
    id: "1",
    title: "Misteri Kode yang Hilang",
    author: "Rian Dev",
    genre: "Teknologi",
    price: 45000,
    rating: 4.8,
    reviews: [{ user: "Andi", rating: 5, text: "Sangat direkomendasikan!" }],
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&q=80",
    synopsis: "Kisah petualangan seorang developer memecahkan enkripsi kuno peninggalan era perang dingin.",
    sampleText: "Bab 1: Baris Pertama Semesta. Hujan deras mengguyur Jakarta saat compiler IDE milik Rian mendadak memunculkan pesan aneh...",
    fullText: "Bab 1 - 20 [Akses Penuh]: Terima kasih telah membeli! Ini adalah teks lengkap dari buku misteri kode yang hilang...",
    status: "approved"
  },
  {
    id: "2",
    title: "Filosofi Kopi Sore",
    author: "Arka Pena",
    genre: "Fiksi",
    price: 35000,
    rating: 4.2,
    reviews: [],
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
    synopsis: "Esai pendek menangkap arti hidup lewat secangkir americano hangat.",
    sampleText: "Bab 1: Aroma Pahit. Secangkir kopi tidak pernah berdusta tentang rasa pahitnya...",
    fullText: "Bab 1 - 15 [Akses Penuh]: Teks lengkap Filosofi Kopi Sore. Selamat membaca!",
    status: "approved"
  }
];

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<any[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [myLibrary, setMyLibrary] = useState<string[]>([]);
  const [authorBalance, setAuthorBalance] = useState(0);
  const [adminCommission, setAdminCommission] = useState(0);
  
  // State User Login Terpusat
  const [user, setUser] = useState<{ email: string; role: "reader" | "author" | "admin"; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setBooks(JSON.parse(localStorage.getItem("db_books") || JSON.stringify(INITIAL_BOOKS)));
    setCart(JSON.parse(localStorage.getItem("db_cart") || "[]"));
    setWishlist(JSON.parse(localStorage.getItem("db_wishlist") || "[]"));
    setMyLibrary(JSON.parse(localStorage.getItem("db_library") || "[]"));
    setAuthorBalance(Number(localStorage.getItem("db_author_balance") || "120000"));
    setAdminCommission(Number(localStorage.getItem("db_admin_commission") || "30000"));
    
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setIsLoading(false);
  }, []);

  const save = (key: string, data: any, setter: any) => {
    setter(data);
    localStorage.setItem(key, typeof data === "string" ? data : JSON.stringify(data));
  };

  const login = (email: string, role: "reader" | "author" | "admin", name: string) => {
    const userData = { email, role, name };
    save("auth_user", userData, setUser);
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  const toggleCart = (id: string) => {
    const updated = cart.includes(id) ? cart.filter(x => x !== id) : [...cart, id];
    save("db_cart", updated, setCart);
  };

  const toggleWishlist = (id: string) => {
    const updated = wishlist.includes(id) ? wishlist.filter(x => x !== id) : [...wishlist, id];
    save("db_wishlist", updated, setWishlist);
  };

  const handleCheckout = () => {
    let extraAuthor = 0;
    let extraAdmin = 0;
    cart.forEach(id => {
      const b = books.find(item => item.id === id);
      if (b) {
        extraAuthor += b.price * 0.8;
        extraAdmin += b.price * 0.2;
      }
    });

    const newLib = Array.from(new Set([...myLibrary, ...cart]));
    save("db_library", newLib, setMyLibrary);
    save("db_author_balance", authorBalance + extraAuthor, setAuthorBalance);
    save("db_admin_commission", adminCommission + extraAdmin, setAdminCommission);
    save("db_cart", [], setCart);
    alert("Pembayaran Sukses! Buku otomatis masuk ke Rak Buku Anda.");
  };

  return (
    <AppContext.Provider value={{
      books, setBooks: (d: any) => save("db_books", d, setBooks),
      cart, toggleCart, handleCheckout,
      wishlist, toggleWishlist,
      myLibrary, authorBalance, adminCommission,
      user, login, logout, isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
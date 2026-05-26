"use client";

import { AppProvider, useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import LoginPage from "@/app/login/page";
import "@/app/globals.css";

function AppContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500 font-medium">
        Memvalidasi Sembari Mengenkripsi Sesi...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-slate-50 text-slate-900 min-h-screen font-sans antialiased">
        <main className="max-w-7xl mx-auto px-4 py-8">
          <LoginPage />
        </main>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans antialiased">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AppProvider>
          <AppContent>{children}</AppContent>
        </AppProvider>
      </body>
    </html>
  );
}
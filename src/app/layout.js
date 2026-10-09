import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import CategoryNav from "@/components/layout/CategoryNav";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light">
      <body className={hindSiliguri.className}>
        <Toaster />
        <header className="border-b border-gray-200 bg-[#fbfcfb]">
          <Navbar />

          <Suspense
            fallback={
              <div className="mx-auto flex max-w-6xl gap-2 border-t border-gray-100 px-4 py-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton h-10 w-24 shrink-0 rounded-xl" />
                ))}
              </div>
            }
          >
            <CategoryNav />
          </Suspense>
        </header>

        <Suspense fallback={<div className="skeleton h-12 w-full rounded-none" />}>
          <PriceTicker />
        </Suspense>

        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import Header from "@/features/header/Header";
import Footer from "@/features/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import MenuProvider from "@/providers/MenuProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doll Eats | Authentic Indian Food",
  description:
    "Discover delicious Indian dishes made with fresh ingredients and authentic flavors.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen justify-center max-w-7xl mx-auto  bg-[#0a0a0a] text-white">
        <MenuProvider>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </MenuProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

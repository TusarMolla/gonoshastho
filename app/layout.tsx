import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LayoutEffects from "./components/LayoutEffects";
import CursorParticleEffect from "./components/CursorParticleEffect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "গণস্বাস্থ্য হোমিও - আধুনিক হোমিওপ্যাথিক চিকিৎসা কেন্দ্র",
  icons: {
         icon: '/logo.png',// path relative to public folder
       },
  description:
    "গণস্বাস্থ্য হোমিও বাংলাদেশের অন্যতম সেরা হোমিওপ্যাথিক চিকিৎসা কেন্দ্র। আমরা প্রাকৃতিক উপায়ে সম্পূর্ণরূপে চিকিৎসা করি।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn"> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutEffects />
        <CursorParticleEffect />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

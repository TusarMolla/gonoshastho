import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LayoutEffects from "./components/LayoutEffects";
import CursorParticleEffect from "./components/CursorParticleEffect";
import Script from "next/script";

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
  // ✅ পরিবেশ ভেরিয়েবল থেকে Pixel ID নিন
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "YOUR_PIXEL_ID";

  return (
    <html lang="bn">
      <head>
        {/* ✅ ফেসবুক পিক্সেল - Meta Pixel */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* ✅ নসক্রিপ্ট ফ্যালব্যাক */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt="facebook-pixel"
          />
        </noscript>
      </head>
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
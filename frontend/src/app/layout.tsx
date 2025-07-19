import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarisend",
  description: "Your crypto wallet for everyday life.",
  icons: {
    icon: '/siteLogo.png',
    shortcut: '/siteLogo.png',
    apple: '/siteLogo.png',
  },
  openGraph: {
    title: "Sarisend",
    description: "Your crypto wallet for everyday life.",
    images: [
      {
        url: '/siteLogo.png',
        width: 1200,
        height: 630,
        alt: 'Sarisend Logo',
      },
    ],
  },
  twitter: {
    title: "Sarisend",
    description: "Your crypto wallet for everyday life.",
    images: ['/siteLogo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

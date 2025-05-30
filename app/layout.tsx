
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cyber Order",
  description: "Order Tracker",
  icons: {
    icon:'/main.svg'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Cyber Order</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Wrap children in a client-side provider component */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

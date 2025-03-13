"use client";

import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
        <body className={`${inter.className} flex flex-col min-h-[100vh]`}>
          <Header />
          <main className="flex-1">{children}</main>
          <ToastContainer />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

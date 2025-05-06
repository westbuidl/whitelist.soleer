import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/Navbar";


export const metadata: Metadata = {
  title: "Soleer",
  description: "Soleer | is the first peer-to-peer services marketplace on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Soleer</title>
      <body>

        {children}
      </body>
    </html>
  );
}

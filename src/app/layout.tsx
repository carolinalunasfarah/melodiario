import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/src/modules/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Melodiario",
  description: "Tu dosis diaria de música",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-brand-background font-sans text-brand-text">
        {children}
      </body>
    </html>
  );
}

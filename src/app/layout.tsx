import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/modules/styles/globals.css";
import { Toaster } from "../modules/components/ui/Sonner";
import { Analytics } from "@vercel/analytics/react";

const interFont = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s / Melodiario",
    default: "Tu dosis diaria de música / Melodiario",
  },
  description:
    "Un espacio íntimo para llevar un diario musical y de emociones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${interFont.className} h-full antialiased`}>
      <body className="flex flex-col min-h-screen bg-brand-background font-sans text-brand-text">
        <main className="w-full">{children}</main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}

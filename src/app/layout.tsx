import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ProgressProvider } from "@/lib/progress";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
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
  title: {
    default: "Jev Academy",
    template: "%s · Jev Academy",
  },
  description:
    "Zero-to-hero public walkthrough for TypeSafe System One (Jev). Not affiliated with TypeSafe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <ProgressProvider>
          <SiteHeader />
          <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
          <SiteFooter />
        </ProgressProvider>
      </body>
    </html>
  );
}

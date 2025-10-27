import PageTransition from "@/components/page-transition";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import { Toaster } from "sonner";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ask Neo",
  description:
    "Conversational AI that remembers every conversation and understands context across time",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-sans antialiased`}
      >
        <PageTransition>{children}</PageTransition>
        <Analytics />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

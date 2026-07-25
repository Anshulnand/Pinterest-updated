import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VisionGrid - Discover and Share Visual Ideas",
  description: "VisionGrid is a modern visual discovery platform built with Next.js, featuring image discovery, saving, and sharing capabilities.",
  keywords: ["visiongrid", "vision grid", "images", "ideas", "inspiration", "nextjs", "react", "visual discovery"],
  authors: [{ name: "VisionGrid" }],
  openGraph: {
    title: "VisionGrid - Discover and Share Visual Ideas",
    description: "VisionGrid - A modern visual discovery platform built with Next.js",
    type: "website",
  },
};

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_Y2xldmVyLW11c2tveC00OC5jbGVyay5hY2NvdW50cy5kZXYk";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

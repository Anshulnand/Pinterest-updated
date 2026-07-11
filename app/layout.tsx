import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Header from "@/components/Header";
import Provider from "./Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pinterest Clone - Discover and Save Ideas",
  description: "A Pinterest clone built with Next.js, featuring image discovery, saving, and sharing capabilities.",
  keywords: ["pinterest", "images", "ideas", "inspiration", "nextjs", "react"],
  authors: [{ name: "Pinterest Clone" }],
  openGraph: {
    title: "Pinterest Clone - Discover and Save Ideas",
    description: "A Pinterest clone built with Next.js",
    type: "website",
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
        <Provider>
     <Header></Header>
        {children}
        </Provider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tomáš Daniel — Software Developer | Cybersecurity",
  description:
    "Personal blockchain-themed portfolio of Tomáš Daniel. Software Developer with 6+ years of C++ experience in telecommunications, now focused on Cybersecurity. Explore the chain.",
  keywords: [
    "Tomáš Daniel",
    "Software Developer",
    "C++",
    "Python",
    "Cybersecurity",
    "Brno",
    "Portfolio",
  ],
  authors: [{ name: "Tomáš Daniel" }],
  openGraph: {
    title: "Tomáš Daniel — Software Developer | Cybersecurity",
    description:
      "Explore my blockchain-linked portfolio. Each block reveals a piece of my professional journey.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full dark`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../css/colors.css";
import "../css/fonts.css";
import "../css/globals.css";
import "../css/layout.css";
import "../css/normalize.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sparkuotes",
  description: "Save quotes that spark inspiration!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}

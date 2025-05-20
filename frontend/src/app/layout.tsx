import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Balance Checker | Track Multi-Chain Assets",
  description:
    "Check token balances across multiple blockchains with a seamless UI",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-gradient-to-b from-gray-900 to-indigo-950`}
      >
        {children}
      </body>
    </html>
  );
}

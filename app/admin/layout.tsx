import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./admin.css";
import AdminFrame from "./_components/AdminFrame";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Painel Admin | Neural Capital",
    template: "%s | Neural Capital",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminFrame fontClass={`${barlow.variable} ${barlowCondensed.variable}`}>
      {children}
    </AdminFrame>
  );
}
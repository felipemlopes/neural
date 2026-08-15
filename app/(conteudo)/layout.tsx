import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { apiFetch } from "../lib/api";
import type { Category } from "../lib/types";

export const metadata: Metadata = {
  title: {
    default: "Conteúdo | Neural Capital",
    template: "%s | Neural Capital",
  },
};

export default async function ConteudoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const data = await apiFetch<{ categories: Category[] }>("/categories");
  const categories = data?.categories ?? [];

  return (
    <>
      <SiteHeader categories={categories} />
      {children}
      <SiteFooter />
    </>
  );
}

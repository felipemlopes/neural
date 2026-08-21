import type { Metadata } from "next";
import MembersShell from "./_components/MembersShell";

export const metadata: Metadata = {
  title: { default: "Área de Membros | Neural Capital", template: "%s | Neural Capital" },
  robots: { index: false, follow: false },
};

export default function MembrosLayout({ children }: { children: React.ReactNode }) {
  return <MembersShell>{children}</MembersShell>;
}


"use client";

import { usePathname } from "next/navigation";
import Shell from "./Shell";

export default function AdminFrame({
  children,
  fontClass,
}: {
  children: React.ReactNode;
  fontClass: string;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <div className={fontClass}>{children}</div>;
  }

  return <Shell fontClass={fontClass}>{children}</Shell>;
}
import type { ReactNode } from "react";

export function LeftPanel({ children }: { children: ReactNode }) {
  return <section className="w-[280px] flex flex-col  overflow-auto  bg-sidebar  border-r">{children}</section>;
}
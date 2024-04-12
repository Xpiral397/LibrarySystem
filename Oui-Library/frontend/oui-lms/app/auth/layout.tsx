import { RecordWithTtl } from "dns";
import React, { ReactNode } from "react";
import { loadData } from "../context/clientStorage/save";
import { InitialData } from "../context/type";

export default function Layout({ children }: { children: ReactNode }) {
  const current_data: InitialData = loadData();
  return <div className="w-full h-full">{children}</div>;
}

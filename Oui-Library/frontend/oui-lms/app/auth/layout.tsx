"use client";
import { RecordWithTtl } from "dns";
import React, { ReactNode, useEffect } from "react";
import { initialData } from "../context/clientStorage/save";
import { InitialData } from "../context/type";
import auth from "../context/reducers/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { stringify } from "querystring";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  // specific data from the Redux storea
  const stateManagemnt: InitialData["auth"] = useSelector(
    (state: any) => state.auth
  );
  if (stateManagemnt.isAuthenticated) {
    router.push("/dashboard/discover");
  }
  // React to changes in the selected data
  useEffect(() => {}, [stateManagemnt]); //
  return <div className="w-full h-full">{children}</div>;
}

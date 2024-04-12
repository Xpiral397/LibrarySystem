"use client";
import React, { ReactNode, useState } from "react";
import Logo from "@/public/logo.png";
import { Image } from "@nextui-org/react";
import {
  Category,
  CreditCard,
  Home,
  Payment,
  SafetyCheck,
  Verified,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [selected, setSelect] = useState<string>("Discover");
  const router = useRouter();
  const Navbars: {
    name: string;
    links: string;
    icon: ReactNode;
  }[] = [
    {
      name: "Discover",
      links: "/discover",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "Discover" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <Home color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Category",
      links: "/category",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "Category" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <Category color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Reserved Books",
      links: "/reserve",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "Reserved Books" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <SafetyCheck color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Lend Books",
      links: "/Lend",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "Lend Books" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <CreditCard color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Subscriptions",
      links: "/subscription",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "Subscriptions" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <Payment color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Checks",
      links: "/subscription",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "Checks" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <Verified color="inherit" fontSize="small" fontSize="small" />
        </div>
      ),
    },
  ];
  return (
    <div className=" w-[300px] h-full shadow-md">
      <ul className="space-y-5 p-5 ">
        {Navbars.map((nav) => {
          return (
            <li
              onClick={() => {
                router.push(nav.links);
              }}
              className="flex items-center jsutify-center w-ful h-full font-semibold  space-x-3  hover:bg-slate-50"
            >
              <div>{nav.icon}</div>
              {selected == nav.name ? (
                <span className="text-slate-800">{nav.name}</span>
              ) : (
                <span className="text-slate-500">{nav.name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

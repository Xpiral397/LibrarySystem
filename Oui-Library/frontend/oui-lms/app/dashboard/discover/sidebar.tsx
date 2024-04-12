"use client";
import { Star } from "@mui/icons-material";
import { Image } from "@nextui-org/react";
import React from "react";
import Books from "@/public/books.jpg";

export interface Books {
  id: string;
  cover: string;
  author: string;
  title: string;
  name: string;
  rate: string;
  rated: string;
  pages: string;
  rating: string;
  reviews: string;
  description: string;
}
export default function Sidebar({ Book }: { Book: Books }) {
  return (
    <div className="text-white space-y-10 font-[300] text-[16px] rounded-lg flex flex-col text-center   w-full h-full ">
      <div className="bg-slate-100 rounded-lg py-5 px-3">
        <div className="w-full px-10">
          <Image src={Books.src} />
        </div>
        <div>
          <h1 className=" font-[500] mt-5  text-purple-800">
            {Book.title ?? "No Title"}
          </h1>
          <p className="font-semibold text-[16px] text-slate-800 ">
            {Book.author ?? "Unknow Author"}
          </p>
        </div>
      </div>
      <div className="  rounded-lg bg-yellow-500 flex font-[400] text-[12px] py-3 px-3 ">
        <div className="items-center w-full h-full">
          <p>{Book.rated ?? 0}</p> <Star fontSize="small" color="inherit" />
        </div>
        <div className="  items-center w-full h-full">
          <p>{Book.pages ?? "0"}</p>
          <p>pages</p>{" "}
        </div>
        <div className="  items-center w-full h-full">
          <p>{Book.rating ?? "0"}</p>
          <p>ratings</p>{" "}
        </div>

        <div>
          <p>{Book.reviews ?? 0}</p>
          <p>Reviews</p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Image, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { Books } from "./sidebar";
import { ArrowBackIos, ArrowForwardIos, List } from "@mui/icons-material";

export interface Category {
  categories: string[];
  category: {
    [key: string]: Books[];
  };
}

export default function BooksRender({
  Category,
  key,
}: {
  Category: Books;
  key: string;
}) {
  return (
    <div
      key={key}
      className="transform hover:scale-105 transition-transform duration-300 shadow-mds rounded-lg w-[100px] h-[150px] bg-white"
    >
      <Image src={Category.cover} className="w-full h-[100px]" />
      <div className="p-3">
        <h1 className="font-semibold text-ellipsis w-full">{Category.title}</h1>
        <p className="text-sm">{Category.author}</p>
      </div>
    </div>
  );
}

export function Recommended({ RecomendBooks }: { RecomendBooks: Books[] }) {
  return (
    <div className="bg-white rounded-lg px-5 py-10 shadow-md">
      <div className="flex w-full justify-between">
        <p>Recomended</p>
        <span className="bg-blue-50 rounded-sm">
          <p className="text-blue-500 text-sm rounded-md">
            See All <span>{<ArrowForwardIos color="secondary" />}</span>
          </p>
        </span>
      </div>{" "}
      <div className="grid grid-cols-5 w-full gap-3">
        {RecomendBooks.map((category, index) => (
          <BooksRender key={category?.id ?? index} Category={category} />
        ))}
      </div>
    </div>
  );
}

export function CategoryRender({ RecomendBooks }: { RecomendBooks: Category }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      <div className="flex w-full justify-between">
        <p>Categories</p>
        <span className="bg-blue-50 rounded-sm">
          <List color="secondary" />
        </span>
      </div>

      <Tabs radius="md" aria-label="Tabs radius">
        {RecomendBooks.categories.map((cateogry) => (
          <Tab key={cateogry} title={cateogry}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg::grid-cols-6 w-full gap-3 ">
              {RecomendBooks.category[cateogry].map((category, index) => (
                <BooksRender key={category?.id ?? index} Category={category} />
              ))}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

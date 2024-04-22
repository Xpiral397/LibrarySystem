"use client";
import {
  Button,
  Image,
  Input,
  ScrollShadow,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React, { useContext } from "react";
import { Books } from "./sidebar";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Book,
  BookOnline,
  Delete,
  Edit,
  List,
  Pages,
  Recommend,
  RecommendOutlined,
  RecommendRounded,
  Search,
} from "@mui/icons-material";
import UseSelectedBookProvider, {
  UseSelectedBooks,
} from "@/app/context/useSelectBooks/useSelectBooks";

export interface Category {
  categories: string[];
  category: {
    [key: string]: Books[];
  };
}

export default function BooksRender({
  Category,
  key,
  isAdmin = false,
}: {
  isAdmin: boolean;
  Category: Books;
  key: string;
}) {
  const { selectedBooks, setSelectedBooks } = useContext<UseSelectedBooks>(
    UseSelectedBookProvider
  );
  return (
    <div
      onClick={() => {
        // alert("About to set books");
        setSelectedBooks(Category);
      }}
      key={key}
      className="relative transform hover:scale-105 transition-transform duration-300 shadow-mds rounded-lg sm:w-[250px] w-[200px]  h-[380px] bg-slate-200 flex  items-center justify-center flex-col"
    >
      {isAdmin && (
        <div className="absolute right-2 top-0 ml-8 mt-2 space-x-3">
          <Edit fontSize="small" color="warning" />
          <Delete fontSize="small" color="warning" />
        </div>
      )}
      <div className="w-[180px] flex items-center justify-center sm:w-full">
        <Image src={Category.cover} className="h-[200px]" />
      </div>
      <div className=" w-full px-5  ">
        <h1 className="px-3 mt-2 rounded-lg  font-semibold text-ellipsis text-center w-full">
          {Category.title}
        </h1>
        <h1 className="mt-1 rounded-lg  font-semibold text-ellipsis text-center w-full">
          {Category.author}
        </h1>
      </div>
    </div>
  );
}

export function Recommended({
  RecomendBooks,
  isAdmin = false,
}: {
  RecomendBooks: Books[];
  isAdmin?: boolean;
}) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 shadow-md border boder-slate-500  flex flex-col items-center w-full h-full justify-center">
      <div className="flex w-full justify-between">
        <div className="flex space-x-2">
          <RecommendRounded color="secondary" />
          <p className="font-[600] text-secondary-500">Recomended</p>
        </div>
        <span className="bg-blue-50 rounded-md">
          <p className="text-[12px] flex items-center space-x-3 text-blue-500 text-sm rounded-lg p-2">
            <h1 className="text-[12px]">See All</h1>
            <span className="flex ">
              {
                <h1 className="text-[12px]">
                  <ArrowForwardIos color="secondary" fontSize="inherit" />
                </h1>
              }
            </span>
          </p>
        </span>
      </div>{" "}
      <div className="w-full h-full items-center flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10">
          {RecomendBooks.map((category, index) => (
            <BooksRender
              key={category?.id ?? index}
              isAdmin
              Category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CategoryRender({
  RecomendBooks,
  isAdmin,
}: {
  RecomendBooks: Category;
  isAdmin: boolean;
}) {
  return (
    <div className="bg-slate-50 border-slate-200 border rounded-lg shadow-lg  p-3 flex flex-col items-center w-full h-full justify-center">
      <div className="flex w-full justify-between">
        <p className="flex space-x-2">
          <Recommend color="secondary" />
          <p>Categorise</p>
        </p>
        <span className="bg-blue-50 rounded-sm">
          <List color="secondary" />
        </span>
      </div>
      <div className="flex justify-center items-center  w-full sm:w-1/2 mt-10 mb-8">
        <Input
          className=""
          size="md"
          startContent={
            <div className="w-5 h-5 rounded-full bgslate-200">
              <Search fontSize="small" color="secondary" />
            </div>
          }
        />
      </div>
      <ScrollShadow>
        <Tabs radius="md" aria-label="Tabs radius">
          {RecomendBooks.categories.map((cateogry) => (
            <Tab key={cateogry} title={cateogry}>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-2 md:gap-5 xl:gap-10 ">
                {RecomendBooks.category[cateogry].map((category, index) => (
                  <BooksRender
                    isAdmin={isAdmin}
                    key={category?.id ?? index}
                    Category={category}
                  />
                ))}
              </div>
            </Tab>
          ))}
        </Tabs>
      </ScrollShadow>
    </div>
  );
}

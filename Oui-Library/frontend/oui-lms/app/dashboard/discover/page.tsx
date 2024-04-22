"use client";
import React, { useContext, useEffect, useState } from "react";
import Sidebar, { Books } from "./sidebar";
import { useRouter } from "next/navigation";
import Book from "@/public/books.jpg";
import { Category, CategoryRender, Recommended } from "./component";
import { ScrollShadow } from "@nextui-org/react";
import { InitialData } from "@/app/context/type";
import { loadData } from "@/app/context/clientStorage/save";
import { Cancel } from "@mui/icons-material";
import UseSelectedBookProvider, {
  UseSelectedBooks,
} from "@/app/context/useSelectBooks/useSelectBooks";
import { tree } from "next/dist/build/templates/app-page";
export type Loading = "Loading";
export type Unauthenticated = "unathenticated";
export default function Page() {
  const [show, setshow] = useState<boolean>(true);
  const [store, setStore] = useState<InitialData | Loading | Unauthenticated>(
    "Loading"
  );
  const { selectedBooks, setSelectedBooks } = useContext<UseSelectedBooks>(
    UseSelectedBookProvider
  );
  const router = useRouter();
  useEffect(() => {
    const store = loadData();
    if (!store.auth.isAuthenticated) {
      router.push("/auth/signin");
    } else {
      setStore(store);
      setshow(true);
    }
  }, [selectedBooks]);

  const [categories, setCategories] = useState<Category>({
    categories: ["Fiction", "Science"], // Assuming there's only one category for simplicity
    category: {
      Fiction: Array.from({ length: 20 }, (_, index) => ({
        id: `book_${index + 1}`,
        cover: Book.src,
        author: `Author ${index + 1}`,
        title: `Book Title ${index + 1}`,
        name: `Book Name ${index + 1}`,
        rate: "5", // Example rating
        rated: "Rated", // Example rated status
        pages: "300", // Example number of pages
        rating: "4.5", // Example rating
        reviews: "100", // Example number of reviews
        description: `Description of book ${index + 1}`, // Example description
      })),
      Science: Array.from({ length: 20 }, (_, index) => ({
        id: `book_${index + 1}`,
        cover: Book.src,
        author: `Author ${index + 1}`,
        title: `Book Title ${index + 1}`,
        name: `Book Name ${index + 1}`,
        rate: "5", // Example rating
        rated: "Rated", // Example rated status
        pages: "300", // Example number of pages
        rating: "4.5", // Example rating
        reviews: "100", // Example number of reviews
        description: `Description of book ${index + 1}`, // Example description
      })),
    },
  });

  return (
    <div className=" flex lg:flex-row flex-col bg-slate-50 w-full h-full ">
      <ScrollShadow
        hideScrollBar
        orientation="vertical"
        className="w-full sm:h-screen h-full"
      >
        <div className="w-full h-full">
          <div className="p-5 rounded-lg space-y-3 w-full">
            <section className="p-1 bg-inherit w-full">
              <Recommended
                RecomendBooks={Array.from({ length: 3 }, (_, index) => ({
                  id: `book_${index + 1}`,
                  cover: Book.src,
                  author: `Author ${index + 1}`,
                  title: `Book Title ${index + 1}`,
                  name: `Book Name ${index + 1}`,
                  rate: "5", // Example rating
                  rated: "Rated", // Example rated status
                  pages: "300", // Example number of pages
                  rating: "4.5", // Example rating
                  reviews: "100", // Example number of reviews
                  description: `Description of book ${index + 1}`, // Example description
                }))}
              />
            </section>
          </div>

          <div className="p-5 rounded-lg space-y-3 w-full">
            <section className="p-1 w-full">
              <CategoryRender isAdmin={false} RecomendBooks={categories} />
            </section>
          </div>
        </div>
      </ScrollShadow>
      {selectedBooks && show && (
        <div className="absolute right-0 top-0 bg-white shadow-2xl flex py-5 px-5 justify-center w-[400px] h-full z-[200] ">
          <div onClick={() => setshow(!show)}>
            <Cancel
              className=" mb-10 absolute top-0 mt-2 right-1 left-0 py-1 animate-pulse text-[25px]"
              fontSize="small"
              color="secondary"
            />
            <Sidebar Book={selectedBooks as Books} />
          </div>
        </div>
      )}
    </div>
  );
}

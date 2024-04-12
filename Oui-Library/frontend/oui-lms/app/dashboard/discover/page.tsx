"use client";
import React, { useState } from "react";
import Sidebar, { Books } from "./sidebar";
import Book from "@/public/books.jpg";
import { Category, CategoryRender, Recommended } from "./component";

export default function Page() {
  const [selectedBooks, setSelectedBooks] = useState<Books>({});
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
    <div className=" flex lg:flex-row flex-col bg-slate-50 w-full ">
      <div className="w-full h-ful">
        <div className="p-5 rounded-lg space-y-3 w-full">
          <section className="p-3 bg-white w-full">
            <Recommended
              RecomendBooks={Array.from({ length: 5 }, (_, index) => ({
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
          <section className="p-3 bg-white w-full">
            <CategoryRender RecomendBooks={categories} />
          </section>
        </div>
      </div>
      {selectedBooks && (
        <div className=" flex py-5 px-5 justify-center h-full lg:max-w-[400px] w-full">
          <Sidebar Book={selectedBooks} />
        </div>
      )}
    </div>
  );
}

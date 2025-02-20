"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllSchoolsQuery } from "@/state/api";



const Carousel: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  const {data, isLoading} = useGetAllSchoolsQuery();

  const cards = data?.schools ?? []



  const nextSlide = () => {
    if (cards.length > 0) setIndex((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    if (cards?.length > 0) setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }


  return (
    <div className="relative flex items-center justify-center w-full max-w-lg mx-auto p-4">
      <button
        onClick={prevSlide}
        className="absolute left-0 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700"
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>
      <div className="w-80 h-96 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={cards[index]?.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gray-200 p-6 rounded-xl shadow-lg flex flex-col justify-center items-center text-center"
          >
            <h2 className="text-xl font-bold">{cards[index]?.name}</h2>
            <p className="text-gray-600 mt-2">{cards[index]?.address}</p>
            <p className="text-gray-600 mt-2">{cards[index]?.phone}</p>
            <a href={`mailto:${cards[index]?.email}`} className="text-blue-600 mt-2">{cards[index]?.email}</a>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={nextSlide}
        className="absolute right-0 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700"
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Carousel;

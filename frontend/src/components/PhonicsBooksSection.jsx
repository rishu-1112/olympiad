"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";

import { phonicsBooks } from "../data/phonicsBooks";

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const PhonicsBooksSection = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
      {/* 📚 BOOK SECTION */}
      <section className="relative bg-[#fff6cc] py-20 overflow-hidden">
        {/* Cute floating dots */}
        <div className="absolute top-10 left-10 w-6 h-6 bg-[#ffd033] rounded-full opacity-40" />
        <div className="absolute bottom-20 right-16 w-4 h-4 bg-[#ff1e9d] rounded-full opacity-30" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* TITLE */}
          <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#341b79]">
            Phonics Olympiad Workbook
          </h2>
          <p className="text-center text-[#341b79]/80 mt-3 max-w-xl mx-auto">
            Fun, colourful and engaging workbooks designed especially for
            young learners.
          </p>

          {/* 🎠 CAROUSEL */}
          <div className="mt-12">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              breakpoints={{
                0: { slidesPerView: 1.2 },
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {phonicsBooks.map((book, index) => (
                <SwiperSlide key={book.id}>
                  <motion.div
                    {...floatingAnimation}
                    transition={{
                      ...floatingAnimation.transition,
                      delay: index * 0.2,
                    }}
                    className="bg-white rounded-[28px] shadow-lg p-5 hover:-translate-y-3 transition-all duration-300"
                  >
                    <img
                      src={book.img}
                      alt={book.title}
                      className="h-56 w-full object-contain"
                    />

                    <div className="mt-4 text-center">
                      <h3 className="font-bold text-[#341b79] text-sm">
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Level: {book.level}
                      </p>

                      <button
                        onClick={() => setSelectedBook(book)}
                        className="mt-4 bg-[#ff1e9d] text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-[#e4007c] transition"
                      >
                        View Book
                      </button>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 📖 SINGLE BOOK PREVIEW MODAL */}
{selectedBook && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl"
    >
      {/* Close Button */}
      <button
        onClick={() => setSelectedBook(null)}
        className="absolute top-4 right-4 h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
      >
        ✕
      </button>

      {/* Book Image */}
      <img
        src={selectedBook.img}
        alt={selectedBook.title}
        className="h-64 w-full object-contain mx-auto"
      />

      {/* Title */}
      <h3 className="mt-4 text-2xl font-extrabold text-[#341b79] text-center">
        {selectedBook.title}
      </h3>

      {/* Meta */}
      <p className="mt-1 text-center text-sm text-gray-500">
        Level: <span className="font-semibold">{selectedBook.level}</span> · Age:{" "}
        <span className="font-semibold">{selectedBook.ageGroup}</span>
      </p>
      {/* Subject */}
        <p className="mt-1 text-center text-sm text-gray-500">
        Subject: <span className="font-semibold">{selectedBook.subject}</span>
        </p>

      {/* Description */}
      <p className="mt-4 text-sm text-gray-700 leading-relaxed text-center">
        {selectedBook.description}
      </p>

      {/* Highlights */}
      {selectedBook.highlights && (
        <div className="mt-5 bg-[#fff6cc] rounded-2xl p-4">
          <h4 className="text-sm font-bold text-[#341b79] mb-2 text-center">
            What your child will learn
          </h4>

          <ul className="grid grid-cols-2 gap-2 text-xs text-gray-700">
            {selectedBook.highlights.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm"
              >
                <span className="text-[#ff1e9d]">✔</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 flex justify-center gap-3">
        {/* <button className="bg-[#341b79] text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition">
          📥 Download Sample
        </button> */}

        <button
          onClick={() => setSelectedBook(null)}
          className="bg-[#ffd033] text-[#341b79] px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
        >
          Close
        </button>
      </div>
    </motion.div>
  </div>
)}

    </>
  );
};

export default PhonicsBooksSection;

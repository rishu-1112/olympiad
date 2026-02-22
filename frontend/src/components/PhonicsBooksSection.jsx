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
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedType, setSelectedType] = useState("All");


  const filteredBooks = phonicsBooks.filter((book) => {
    const classMatch =
      selectedClass === "All" || book.level.includes(selectedClass);

    const typeMatch =
      selectedType === "All" || book.level.includes(selectedType);

    return classMatch && typeMatch;
  });
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
          {/* FILTERS */}
          <div className="flex flex-wrap gap-3 justify-center mt-8">

            {/* Class Filter */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 rounded-full border text-sm"
            >
              <option value="All">All Classes</option>
              <option value="Nursery">Nursery</option>
              <option value="Junior KG">Junior KG</option>
              <option value="Senior KG">Senior KG</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 rounded-full border text-sm"
            >
              <option value="All">All Types</option>
              <option value="School">Intra School</option>
              <option value="Interschool">Interschool</option>
              {/* <option value="International">International</option> */}
            </select>
          </div>
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
              {filteredBooks.map((book, index) => (
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

  <p className="text-sm font-bold text-[#ff1e9d] mt-2">
    ₹499
  </p>

  <div className="flex justify-center gap-2 mt-3">
    <button
      onClick={() => setSelectedBook(book)}
      className="bg-gray-200 px-4 py-2 rounded-full text-xs font-semibold"
    >
      View
    </button>

    <button
      onClick={() => handleBuyNow(book)}
      className="bg-[#ff1e9d] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#e4007c]"
    >
      Buy Now
    </button>
  </div>
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="
        relative bg-white rounded-3xl shadow-2xl
        w-full max-w-lg
        max-h-[92vh] overflow-y-auto
        p-4 sm:p-6
      "
    >
      {/* Close Button */}
      <button
        onClick={() => setSelectedBook(null)}
        className="
          absolute top-3 right-3
          h-8 w-8 sm:h-9 sm:w-9
          rounded-full bg-gray-100
          flex items-center justify-center
          text-gray-600 hover:bg-gray-200
        "
      >
        ✕
      </button>

      {/* Book Image */}
      <img
        src={selectedBook.img}
        alt={selectedBook.title}
        className="
          mx-auto object-contain
          h-44 sm:h-56 md:h-64
        "
      />

      {/* Title */}
      <h3 className="mt-4 text-lg sm:text-xl md:text-2xl font-extrabold text-[#341b79] text-center">
        {selectedBook.title}
      </h3>

      {/* Meta */}
      <p className="mt-1 text-center text-xs sm:text-sm text-gray-500">
        Level: <span className="font-semibold">{selectedBook.level}</span> · Age:{" "}
        <span className="font-semibold">{selectedBook.ageGroup}</span>
      </p>

      {/* Subject */}
      <p className="text-center text-xs sm:text-sm text-gray-500 mt-1">
        Subject: <span className="font-semibold">{selectedBook.subject}</span>
      </p>

      {/* Description */}
      <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed text-center px-1 sm:px-4">
        {selectedBook.description}
      </p>

      {/* Highlights */}
      {selectedBook.highlights && (
        <div className="mt-5 bg-[#fff6cc] rounded-2xl p-4">
          <h4 className="text-sm font-bold text-[#341b79] mb-3 text-center">
            What your child will learn
          </h4>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
            {selectedBook.highlights.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-sm"
              >
                <span className="text-[#ff1e9d]">✔</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setSelectedBook(null)}
          className="
            bg-[#ffd033] text-[#341b79]
            px-6 py-2 rounded-full
            font-semibold
            hover:scale-105 transition
          "
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

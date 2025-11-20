import React from "react";
import { motion } from "framer-motion";

import logo1 from "../assets/wonderKIdz.png";
import logo2 from "../assets/appleSchool.jpg"; // second partner logo
import logo3 from "../assets/phonics.jpg";

import mathImg from "../assets/math-Photoroom.png";
import p from "../assets/greenP.png";

const Partners = () => {
  const partnerData = [
    {
      logo: logo1,
      name: "Wonder Kidz",
      location: "Nigdi"
    },
    {
      logo: logo2,
      name: "The Red Apple",
      location: "Pimpri"
    },{
      logo: logo3,
      name: "Phonics World",
      location: "Pune"
    }
  ];

  return (
    <section className="w-full bg-[#ffffff] pt-12 pb-20">

      {/* ---- MAIN HEADING ---- */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-[#341b79]"
      >
        Our Official School Partners
      </motion.h2>

      {/* ---- PARTNERS LOGOS ---- */}
      <div className="flex justify-center gap-16 md:gap-24 mt-12 flex-wrap px-6">

        {partnerData.map((partner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="flex flex-col items-center text-center"
          >
            {/* Round Logo */}
            <div className="
                w-32 h-32 md:w-36 md:h-36 
                rounded-full overflow-hidden 
                shadow-2xl border-2 border-[#341b79]
                flex items-center justify-center
              ">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name + Location */}
            <div className="mt-4">
              <p className="text-lg font-bold text-[#341b79]">
                {partner.name}
              </p>

              <p className="text-sm text-[#555] flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-[#ff008c] rounded-full inline-block"></span>
                {partner.location}
              </p>
            </div>
          </motion.div>
        ))}

      </div>

      {/* --------------------------------------------------------- */}
      {/* THE REST OF YOUR CARDS CODE REMAINS UNTOUCHED BELOW ↓↓↓ */}
      {/* --------------------------------------------------------- */}

      <div className="w-full max-w-6xl mx-auto px-6 mt-12 grid md:grid-cols-2 gap-10">

        {/* ========= MENTAL MATHS CARD ========= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6 }}
          className="
            relative 
            w-full 
            min-h-[260px] 
            rounded-3xl 
            shadow-xl 
            overflow-hidden
            bg-[#341b79]
          "
        >
          <div
            className="
              absolute top-0 left-0 
              w-1/2 h-full
              bg-[#ff008c]
              p-6
              text-white
              rounded-3xl
              z-20
            "
          >
            <h3 className="text-2xl md:text-3xl font-extrabold">
              Mental Maths
            </h3>

            <div className="flex-grow flex items-start justify-center overflow-visible">
              <img
                src={mathImg}
                alt="Mental Maths"
                className="max-h-full max-w-full object-contain pointer-events-none"
              />
            </div>
          </div>

          <div
            className="
              absolute right-0 top-0
              w-1/2 h-full
              p-6 text-white flex items-center
            "
          >
            <ul className="text-base md:text-lg font-semibold leading-relaxed space-y-2">
              <li>• Syllabus</li>
              <li>• Sample Paper</li>
              <li>• Fees</li>
              <li>• Rankers</li>
              <li>• Awards</li>
            </ul>
          </div>
        </motion.div>

        {/* ========= PHONICS OLYMPIAD CARD ========= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6 }}
          className="
            relative 
            w-full 
            min-h-[260px] 
            rounded-3xl 
            shadow-xl 
            overflow-hidden
            bg-[#341b79]
          "
        >
          <div
            className="
              absolute top-0 left-0 
              w-1/2 h-full
              bg-[#ff008c]
              p-6
              text-white
              rounded-3xl
              z-20
            "
          >
            <h3 className="text-2xl md:text-3xl font-extrabold">
              Phonics Olympiad
            </h3>

            <div className="relative w-full h-[70%] mt-3">
              <img
                src={p}
                alt="Phonics Olympiad"
                className="absolute bottom-0 left-0 w-auto h-full object-contain pointer-events-none"
              />
            </div>
          </div>

          <div
            className="
              absolute right-0 top-0
              w-1/2 h-full
              p-6 text-white flex items-center
            "
          >
            <ul className="text-base md:text-lg font-semibold leading-relaxed space-y-2">
              <li>• Syllabus</li>
              <li>• Sample Paper</li>
              <li>• Fees</li>
              <li>• Rankers</li>
              <li>• Awards</li>
            </ul>
          </div>
        </motion.div>

      </div>

    </section>
  );
};

export default Partners;

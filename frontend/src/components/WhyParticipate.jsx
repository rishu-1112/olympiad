import React from "react";
import { motion } from "framer-motion";
/* import your image here (replace with your asset) */
import centerImg from "../assets/read-girl.png"; // <- replace with your image path
import skill1 from "../assets/skillDEv.png";
import skill2 from "../assets/confi.png";
import skill3 from "../assets/skills5.png";
import skill4 from "../assets/recog.png";
import skill5 from "../assets/fun.png";
import skill6 from "../assets/skilll6.png";

const featureItemsLeft = [
  { color: "bg-[#FFB039]", title: "Skill Development", img: skill1 },
  { color: "bg-[#A7F3D0]", title: "Boost Confidence", img: skill2 },
  { color: "bg-[#2DB8FF]", title: "Early Exposure", img: skill3 },
];

const featureItemsRight = [
  { color: "bg-[#8EDC5C]", title: "National Recognition", img: skill4 },
  { color: "bg-[#93A7C6]", title: "Fun Learning", img: skill5 },
  { color: "bg-[#F87171]", title: "Motivational Rewards", img: skill6 },
];

export default function WhyParticipate() {
  return (
    <section className="relative w-full bg-[#f6f6f8]">

      {/* Purple background block (the visible area with curved top) */}
      <div className="relative bg-[#341b79] text-white pt-28 pb-20 md:pb-28 overflow-hidden">
        {/* top decorative purple wave (behind heading) */}
        <div className="absolute -top-8 left-0 w-full pointer-events-none z-0 overflow-hidden">
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="w-full h-[140px] block">
            <path
              d="M0,40 C160,100 320,120 480,80 C640,40 800,20 960,60 C1120,100 1280,120 1440,80 L1440,0 L0,0 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
        {/* decorative thin icons on corners
        <div className="absolute -left-8 top-8 opacity-10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
            <path d="M3 6C3 6 8 2 12 2s9 4 9 4" stroke="#ff1e9d" strokeWidth="1.5"></path>
          </svg>
        </div>
        <div className="absolute right-8 top-6 opacity-10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
            <path d="M2 4L22 4L22 20L2 20Z" stroke="#ff1e9d" strokeWidth="1.2"></path>
          </svg>
        </div> */}

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-20 text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          Why Participate Phonics Olympiad?
        </motion.h2>

        {/* Content grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-8 md:justify-center">
            {featureItemsLeft.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex items-center gap-6"
              >
                <div
                  className={`flex-none ${it.color} rounded-xl w-20 h-20 flex items-center justify-center shadow-lg`}
                >
                  <img
                    src={it.img}
                    alt={it.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="text-lg md:text-xl font-semibold">{it.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Center column: full image starting from bottom with flower behind */}
          <div className="relative flex items-end justify-center md:justify-center h-[260px] md:h-[360px] lg:h-[460px]">
            {/* simple hot-pink flower behind the image (subtle)
            <motion.div
              className="absolute z-10 bottom-0"
              initial={{ scale: 0.98 }}
              animate={{ scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ pointerEvents: "none" }}
            >
              <svg viewBox="0 0 400 400" className="w-[260px] md:w-[380px] lg:w-[480px]">
                <defs>
                  <linearGradient id="pinkGrad2" x1="0" x2="1">
                    <stop offset="0%" stopColor="#ff008c" />
                    <stop offset="100%" stopColor="#ff3a97" />
                  </linearGradient>
                </defs>
                <g fill="url(#pinkGrad2)" opacity="0.98">
                  <circle cx="200" cy="140" r="56" />
                  <circle cx="240" cy="185" r="56" />
                  <circle cx="160" cy="185" r="56" />
                  <circle cx="220" cy="235" r="56" />
                  <circle cx="180" cy="235" r="56" />
                </g>
              </svg>
            </motion.div> */}

            {/* full image (no circle) - bottom-aligned within fixed-height container */}
            <img
              src={centerImg}
              alt="child"
              className="z-20 absolute bottom-0 w-auto h-full max-w-[220px] md:max-w-[320px] lg:max-w-[420px] object-cover object-bottom"
            />
          </div>



          {/* Right column: 3 reasons */}
          <div className="flex flex-col gap-8 md:justify-center">
            {featureItemsRight.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex items-center gap-6"
              >
                <div
                  className={`flex-none ${it.color} rounded-xl w-20 h-20 flex items-center justify-center shadow-lg`}
                >
                  <img
                    src={it.img}
                    alt={it.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="text-lg md:text-xl font-semibold">{it.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom curved cutter to transition to next section (white) */}
      <div className="w-full -mt-8">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[90px] block">
          <path
            d="M0,0 C160,80 320,80 480,40 C640,0 800,0 960,40 C1120,80 1280,80 1440,0 L1440,120 L0,120 Z"
            fill="#f6f6f8"
          />
        </svg>
      </div>
    </section>
  );
}

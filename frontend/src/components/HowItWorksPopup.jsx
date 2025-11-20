import React from "react";
import { motion } from "framer-motion";

export default function HowItWorksPopup({ onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">

      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* POPUP BOX */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl 
          p-10 text-[#341b79]
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-xl hover:text-black"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-[#341b79]">
            How the Olympiad Works
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            A simple, fun & structured learning journey for Pre-Schoolers.
          </p>
        </div>

        {/* STEPS SECTION */}
        <div className="space-y-6">

          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.1 }}
            className="flex gap-4 items-start"
          >
            <div className="w-12 h-12 rounded-full bg-[#ffd033] flex items-center justify-center text-xl font-bold text-[#341b79]">
              1
            </div>
            <p className="text-[15px] font-semibold">
              Registration is done by schools or parents for their children (Nursery to Grade 3).
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2 }}
            className="flex gap-4 items-start"
          >
            <div className="w-12 h-12 rounded-full bg-[#ff008c] flex items-center justify-center text-xl font-bold text-white">
              2
            </div>
            <p className="text-[15px] font-semibold">
              Students receive self-paced learning material based on phonics + skill-building.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
            className="flex gap-4 items-start"
          >
            <div className="w-12 h-12 rounded-full bg-[#00a8ff] flex items-center justify-center text-xl font-bold text-white">
              3
            </div>
            <p className="text-[15px] font-semibold">
              Students practice anytime with engaging worksheets & phonics activities.
            </p>
          </motion.div>

          {/* Step 4 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.4 }}
            className="flex gap-4 items-start"
          >
            <div className="w-12 h-12 rounded-full bg-[#00c08a] flex items-center justify-center text-xl font-bold text-white">
              4
            </div>
            <p className="text-[15px] font-semibold">
              Olympiad exam is conducted inside the child’s school for convenience.
            </p>
          </motion.div>

          {/* Step 5 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.5 }}
            className="flex gap-4 items-start"
          >
            <div className="w-12 h-12 rounded-full bg-[#7ed321] flex items-center justify-center text-xl font-bold text-white">
              5
            </div>
            <p className="text-[15px] font-semibold">
              Students earn medals, certificates, ranks & scholarship opportunities!
            </p>
          </motion.div>

        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-8 w-full py-3 rounded-xl font-bold bg-gradient-to-r from-[#ff008c] via-[#ff4fb9] to-[#ffd033] text-white shadow-lg hover:scale-[1.02] transition"
        >
          Got it!
        </button>
      </motion.div>
    </div>
  );
}

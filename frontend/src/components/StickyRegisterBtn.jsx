import React from "react";
import { motion } from "framer-motion";

const StickyRegisterBtn = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-[#ff1e9d] to-[#ff69b4] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
    >
      Register Now
    </motion.button>
  );
};

export default StickyRegisterBtn;

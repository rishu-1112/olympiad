// src/components/ThankYouPopup.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThankYouPopup({ open = false, onClose = () => {}, registrationId = null }) {
  const [confettiPieces, setConfettiPieces] = useState([]);

  // 🎊 Generate confetti when popup opens — and clear when closed
  useEffect(() => {
    let mounted = true;
    if (open) {
      const pieces = Array.from({ length: 40 }).map(() => ({
        id: `${Math.random().toString(36).slice(2)}-${Date.now()}`,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        size: Math.random() * 8 + 6,
        rotate: Math.random() * 360,
        color: ["#ff008c", "#ffd033", "#341b79"][
          Math.floor(Math.random() * 3)
        ],
      }));
      if (mounted) setConfettiPieces(pieces);
    } else {
      // clear confetti when popup closed
      setConfettiPieces([]);
    }

    return () => {
      mounted = false;
      setConfettiPieces([]);
    };
  }, [open]);

  if (!open) return null;

  // wrapper close handler that also marks popup seen and calls parent onClose
  const handleClose = () => {
    try {
      localStorage.setItem("olympiadPopupSeen", "1");
    } catch (e) {
      // ignore localStorage errors
    }
    // small timeout to let any exit animation start (if desired)
    try { onClose(); } catch (e) { /* ignore */ }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">

      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Glowing pink blob */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute w-[380px] h-[380px] bg-[#ff008c] blur-[60px] opacity-40 rounded-full animate-pulse"
        style={{ boxShadow: "0 0 120px rgba(255,0,140,0.5)" }}
      />

      {/* 🎊 CONFETTI */}
      {confettiPieces.map((c) => (
        <motion.div
          key={c.id}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{
            y: "120vh",
            opacity: [1, 1, 0],
            rotate: c.rotate + 180,
          }}
          transition={{
            duration: 2.8,
            delay: c.delay,
            ease: "easeOut",
          }}
          style={{
            position: "fixed",
            left: `${c.left}%`,
            width: `${c.size}px`,
            height: `${c.size * 0.4}px`,
            backgroundColor: c.color,
            borderRadius: "2px",
            zIndex: 999,
          }}
        />
      ))}

      {/* Main popup */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="
          relative bg-white rounded-[32px] p-10 max-w-md w-full
          shadow-[0_10px_40px_rgba(0,0,0,0.25)] text-center z-[50]
        "
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Emoji */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="text-5xl mb-4"
        >
          🎉
        </motion.div>

        <h2 className="text-2xl font-extrabold text-[#341b79]">Registration Successful!</h2>

        <p className="text-gray-600 mt-2 text-sm">
          Your child has been registered for the 
          <span className="text-[#ff008c] font-semibold"> Phonics Olympiad</span>.
        </p>

        {/* Registration ID */}
        {registrationId && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-bold text-[#ff008c]"
          >
            Registration ID: {registrationId}
          </motion.p>
        )}

        <div className="mt-6 mb-4 h-[2px] bg-gradient-to-r from-[#ff008c] via-[#ffd033] to-[#341b79] rounded-full" />

        {/* Continue Button */}
        <motion.button
          onClick={handleClose}
          whileHover={{ scale: 1.05 }}
          className="
            w-full py-3
            bg-gradient-to-r from-[#ff008c] via-[#ff4fb9] to-[#ffd033]
            text-white font-bold rounded-2xl shadow-lg
          "
        >
          Continue
        </motion.button>

        {/* 💬 WhatsApp Button */}
        <a
          href="https://wa.me/919890206914?text=Hello,%20I%20just%20registered%20for%20Phonics%20Olympiad.%20Need%20more%20details!"
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-4 w-full flex items-center justify-center gap-3 
            bg-[#25D366] py-3 rounded-2xl shadow-lg text-white font-semibold 
            hover:bg-[#1ebe5d] transition
          "
        >
          <img
            src='https://cdn-icons-png.flaticon.com/512/733/733585.png'
            className="w-6 h-6"
            alt="WhatsApp"
          />
          Chat on WhatsApp
        </a>

      </motion.div>
    </div>
  );
}

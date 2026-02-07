// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import girlImg from "../assets/demot-Photoroom.png";
import logo from "../assets/logo.png";
import { API_URL } from "../api"; // optional, keep if you have it
import toast, { Toaster } from "react-hot-toast";
import ThankYouPopup from "./ThankYouPopUp.jsx"; // ensure file is named ThankYouPopup.jsx exactly
import HowItWorksPopup from "./HowItWorksPopup";


const BACKEND_BASE = (typeof API_URL !== "undefined" && API_URL) || "http://localhost:5000";

// Age group mapping for classes
const CLASS_AGE_MAP = {
  "Nursery": "3-4 years",
  "LKG": "4-5 years",
  "UKG": "5-6 years",
  "Grade 1": "6-7 years",
  "Grade 2": "7-8 years",
  "Grade 3": "8-9 years"
};

const getAgeGroup = (className) => CLASS_AGE_MAP[className] || "";

const Hero = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    className: "",
    mobile: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);


  useEffect(() => {
    try {
      const seen = localStorage.getItem("olympiadPopupSeen");
      if (!seen) {
        const t = setTimeout(() => setShowPopup(true), 500);
        return () => clearTimeout(t);
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  // ---------------- HANDLE INPUT ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  // ---------------- SUBMIT REGISTRATION (NO OTP) ----------------
  const handleSubmit = async (e) => {
    e && e.preventDefault();
    // client-side validation
    if (!formData.parentName || !formData.childName || !formData.mobile || !formData.email) {
      toast.error("Please fill all required fields.");
      return;
    }
    if (formData.mobile && formData.mobile.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: formData.parentName,
          childName: formData.childName,
          className: formData.className,
          mobile: formData.mobile,
          email: formData.email
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setRegistrationId(data.registrationId || null);
        setShowThankYou(true);
        toast.success("Registration successful!");

        // mark popup as seen and close popup if it was open
        try { localStorage.setItem("olympiadPopupSeen", "1"); } catch (e) {}
        setShowPopup(false);

        // reset form fields
        setFormData({
          parentName: "",
          childName: "",
          className: "",
          mobile: "",
          email: ""
        });
      } else {
        const msg = data?.message || data?.error || "Registration failed";
        toast.error(msg);
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#341b79] text-white flex items-center">
      <Toaster position="top-right" />

      {/* First-visit popup: show olympiad form on first visit after short delay */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setShowPopup(false);
              try { localStorage.setItem("olympiadPopupSeen", "1"); } catch (e) {}
            }}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 z-60 shadow-2xl">
            <button
              aria-label="Close"
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => {
                setShowPopup(false);
                try { localStorage.setItem("olympiadPopupSeen", "1"); } catch (e) {}
              }}
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-center text-[#341b79]">Quick Olympiad Registration</h3>
            <p className="text-sm text-center text-gray-600 mt-1">Nursery to Grade 3</p>

            <form className="mt-4 space-y-3 text-sm" onSubmit={handleSubmit}>
              <input
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                type="text"
                placeholder="Parent Full Name"
                className="input-field"
                required
              />
              <input
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                type="text"
                placeholder="Child's Name"
                className="input-field"
                required
              />
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="input-field bg-[#fff7b3] text-[#341b79] font-semibold"
              >
                <option value="">Select Class</option>
                <option>Nursery (3-4 years)</option>
                <option>LKG (4-5 years)</option>
                <option>UKG (5-6 years)</option>
                <option>Grade 1 (6-7 years)</option>
                <option>Grade 2 (7-8 years)</option>
                <option>Grade 3 (8-9 years)</option>
              </select>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="tel"
                placeholder="Parent Mobile Number"
                className="input-field"
                required
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="input-field"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ff1e9d] text-white py-2 rounded-xl font-semibold shadow hover:bg-[#e4007c] transition disabled:opacity-40"
              >
                {loading ? "Registering..." : "Register Now"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LOGO */}
      <motion.img
        src={logo}
        alt="Logo"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          absolute top-3 left-3 z-50
          h-8 sm:h-10 md:h-14 lg:h-16
          w-auto
        "
      />

      {/* BACKGROUND BLOB */}
      <div className="big-blob" />

      {/* GIRL IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 md:left-8 md:translate-x-0"
      >
        <img
          src={girlImg}
          alt="Girl"
          className="h-[240px] sm:h-[300px] md:h-[420px] lg:h-[500px] xl:h-[560px] object-contain"
        />
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="relative z-30 container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* TEXT AREA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            w-full text-center
            pt-24 sm:pt-28 md:pt-0   /* 🔥 padding for mobile only */
            md:w-1/2
            md:text-left
            md:mt-0
            md:ml-[140px] lg:ml-[240px] xl:ml-[300px]
          "
        >

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug">
            Enroll Your Pre-School Into The
            <br />
            <span className="block mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#ffd033] tracking-wide">
              INTERNATIONAL PHONICS OLYMPIAD
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base opacity-90 max-w-[420px] md:max-w-none">
            India’s most engaging & foundation-building Olympiad for Nursery to Grade 3.
          </p>

          <div className="mt-6 flex justify-center md:justify-start gap-4">
            {/* <button className="bg-[#ffd033] text-[#341b79] px-6 py-2 rounded-full font-semibold shadow">
              Learn More
            </button> */}
            <button onClick={() => setShowHowItWorks(true)} className="bg-white/20 px-5 py-2 rounded-full border border-white/40 backdrop-blur-sm flex items-center gap-2">
              <span className="h-5 w-5 bg-white text-[#ff1e9d] flex justify-center items-center rounded-full text-[10px] font-bold">
                ▶
              </span>
              See how it works
            </button>
          </div>
        </motion.div>

        {/* REGISTRATION FORM (no OTP UI) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mt-10 md:w-1/3 md:mt-0 z-30"
        >
          <div className="bg-white text-[#341b79] p-7 rounded-3xl shadow-lg max-w-sm mx-auto">
            <h3 className="text-lg font-bold text-center">Olympiad Registration</h3>
            <p className="text-xs text-center text-slate-600 mt-1">
              Nursery to Grade 3
            </p>

            <form className="mt-5 space-y-3 text-sm" onSubmit={handleSubmit}>
              <input
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                type="text"
                placeholder="Parent Full Name"
                className="input-field"
                required
              />

              <input
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                type="text"
                placeholder="Child's Name"
                className="input-field"
                required
              />

              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="input-field bg-[#fff7b3] text-[#341b79] font-semibold"
              >
                <option value="">Select Class</option>
                <option>Nursery (3-4 years)</option>
                <option>LKG (4-5 years)</option>
                <option>UKG (5-6 years)</option>
                <option>Grade 1 (6-7 years)</option>
                <option>Grade 2 (7-8 years)</option>
                <option>Grade 3 (8-9 years)</option>
              </select>

              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="tel"
                placeholder="Parent Mobile Number"
                className="input-field"
                required
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="input-field"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ff1e9d] text-white py-2 rounded-xl font-semibold shadow hover:bg-[#e4007c] transition disabled:opacity-40"
              >
                {loading ? "Registering..." : "Register Now"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Thank-you popup shown after successful server response */}
      <ThankYouPopup
        open={showThankYou}
        onClose={() => {
          setShowThankYou(false);
          try { localStorage.setItem("olympiadPopupSeen", "1"); } catch (e) {}
        }}
        registrationId={registrationId}
      />

      {showHowItWorks && (
        <HowItWorksPopup onClose={() => setShowHowItWorks(false)} />
      )}

    </section>
  );
};

export default Hero;

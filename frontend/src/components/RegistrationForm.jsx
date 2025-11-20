import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../api";
import ThankYouPopup from "./ThankYouPopup";

const BACKEND_BASE = API_URL || "http://localhost:5000";

export default function FirstVisitRegistrationPopup() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);

  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    className: "",
    mobile: "",
    email: "",
  });

  // SHOW first visit popup
  useEffect(() => {
    try {
      const seen = localStorage.getItem("olympiadPopupSeen");

      if (!seen) {
        setTimeout(() => setOpen(true), 300);
      }
    } catch (e) {}
  }, []);

  const closePopup = () => {
    setOpen(false);
    try {
      localStorage.setItem("olympiadPopupSeen", "1");
    } catch (e) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.parentName || !formData.childName || !formData.mobile) {
      toast.error("Please fill required fields.");
      return;
    }

    if (formData.mobile.length !== 10) {
      toast.error("Enter valid 10-digit mobile");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        closePopup();
        setTimeout(() => {
          setRegistrationId(data.registrationId || null);
          setThankYou(true);
          toast.success("Registration successful!");
        }, 120);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Popup Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center px-4">
        
        <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">

          {/* CLOSE BUTTON */}
          <button
            onClick={closePopup}
            className="absolute top-3 right-3 text-xl text-gray-700 hover:text-black"
          >
            ✕
          </button>

          <h3 className="text-xl font-bold text-center text-[#341b79]">
            Quick Olympiad Registration
          </h3>

          <p className="text-sm text-center text-gray-600 mt-1">
            Nursery to Grade 3
          </p>

          {/* FORM */}
          <form className="mt-5 space-y-3 text-sm" onSubmit={handleSubmit}>
            <input
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              placeholder="Parent Full Name"
              className="input-field"
            />

            <input
              name="childName"
              value={formData.childName}
              onChange={handleChange}
              placeholder="Child's Name"
              className="input-field"
            />

            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="input-field bg-[#fff7b3] text-[#341b79] font-semibold"
            >
              <option value="">Select Class</option>
              <option>Nursery</option>
              <option>LKG</option>
              <option>UKG</option>
              <option>Grade 1</option>
              <option>Grade 2</option>
              <option>Grade 3</option>
            </select>

            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Parent Mobile Number"
              className="input-field"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email (optional)"
              className="input-field"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff1e9d] text-white py-2 rounded-xl font-semibold shadow hover:bg-[#e4007c] transition"
            >
              {loading ? "Registering..." : "Register Now"}
            </button>
          </form>
        </div>
      </div>

      {/* THANK YOU POPUP */}
      <ThankYouPopup
        open={thankYou}
        onClose={() => setThankYou(false)}
        registrationId={registrationId}
      />
    </>
  );
}

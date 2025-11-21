import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ThankYouPopup from "./ThankYouPopUp.jsx";
import { API_URL } from "../api";

const BACKEND_BASE = API_URL || "http://localhost:5000";

export default function FirstVisitRegistrationPopup() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);

  useEffect(() => {
    const seen = localStorage.getItem("olympiadPopupSeen");
    if (seen) {
      setTimeout(() => setOpen(true), 200);
    }
  }, []);

  const closePopup = () => {
    setOpen(false);
    localStorage.setItem("olympiadPopupSeen", "1");
  };

  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    className: "",
    mobile: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.parentName || !formData.childName || !formData.mobile) {
      toast.error("Please fill required fields");
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

      if (data.success) {
        setRegistrationId(data.registrationId || null);
        setThankYou(true);
        closePopup();
        toast.success("Registered successfully!");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Server error");
    }

    setLoading(false);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black/60">
          <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
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

            <form className="mt-5 space-y-3 text-sm" onSubmit={handleSubmit}>
              <input name="parentName" value={formData.parentName} onChange={handleChange} className="input-field" placeholder="Parent Full Name" />
              <input name="childName" value={formData.childName} onChange={handleChange} className="input-field" placeholder="Child's Name" />

              <select name="className" value={formData.className} onChange={handleChange}
                className="input-field bg-[#fff7b3] text-[#341b79] font-semibold">
                <option value="">Select Class</option>
                <option>Nursery</option>
                <option>LKG</option>
                <option>UKG</option>
                <option>Grade 1</option>
                <option>Grade 2</option>
                <option>Grade 3</option>
              </select>

              <input name="mobile" value={formData.mobile} onChange={handleChange} className="input-field" placeholder="Parent Mobile Number" />
              <input name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="Email (optional)" />

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

      {thankYou && (
        <ThankYouPopup
          open={thankYou}
          onClose={() => setThankYou(false)}
          registrationId={registrationId}
        />
      )}
    </>
  );
}

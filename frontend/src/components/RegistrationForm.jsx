import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ThankYouPopup from "./ThankYouPopUp.jsx";
import { API_URL } from "../api";

const BACKEND_BASE = API_URL || "http://localhost:5000";

export default function FirstVisitRegistrationPopup({ showRegistration, setShowRegistration }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [tempId, setTempId] = useState(null);

  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    className: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    if (showRegistration !== undefined) {
      setOpen(showRegistration);
    }
  }, [showRegistration]);

  const closePopup = () => {
    setOpen(false);
    if (setShowRegistration) setShowRegistration(false);
    localStorage.setItem("olympiadPopupSeen", "1");
  };

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  // ---------------- STEP 1: SEND OTP ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.parentName || !formData.childName || !formData.mobile || !formData.email) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.mobile.length !== 10) {
      toast.error("Enter valid 10-digit mobile");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BACKEND_BASE}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("OTP sent to your email");
        setOtpSent(true);
        setTempId(data.tempId);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- STEP 2: VERIFY OTP ----------------
  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_BASE}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempId, otp }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("OTP Verified");
        setOtpVerified(true);
      } else {
        toast.error("Invalid OTP");
      }
    } catch {
      toast.error("Verification failed");
    }
  };

  // ---------------- STEP 3: HANDLE PAYMENT ----------------
  const handlePayment = async () => {
    try {
      const res = await fetch(`${BACKEND_BASE}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempId }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error("Unable to initiate payment");
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "International Phonics Olympiad",
        description: "Registration Fee",
        order_id: data.orderId,
        handler: async function (response) {
          const verifyRes = await fetch(`${BACKEND_BASE}/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              tempId,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            setRegistrationId(verifyData.registrationId);
            setThankYou(true);
            closePopup();
            toast.success("Payment Successful!");
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: formData.parentName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#ff1e9d",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Payment error");
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black/60">
          <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">

            <button onClick={closePopup}
              className="absolute top-3 right-3 text-xl text-gray-700 hover:text-black">
              ✕
            </button>

            <h3 className="text-xl font-bold text-center text-[#341b79]">
              Quick Olympiad Registration
            </h3>

            <div className="bg-[#fff7b3] p-3 rounded-xl text-center my-3">
              <p className="text-sm font-semibold">📅 Exam Date: 14th March 2026 (Saturday)</p>
              <p className="text-sm font-semibold mt-1">💰 Exam Fee: ₹199/-</p>
            </div>

            <form className="space-y-3 text-sm" onSubmit={handleSubmit}>

              <input name="parentName" value={formData.parentName} onChange={handleChange}
                className="input-field" placeholder="Parent Full Name" />

              <input name="childName" value={formData.childName} onChange={handleChange}
                className="input-field" placeholder="Child's Name" />

              <select name="className" value={formData.className} onChange={handleChange}
                className="input-field bg-[#fff7b3] text-[#341b79] font-semibold">
                <option value="">Select Class</option>
                <option>Nursery (3-4 years)</option>
                <option>LKG (4-5 years)</option>
                <option>UKG (5-6 years)</option>
                <option>Grade 1 (6-7 years)</option>
                <option>Grade 2 (7-8 years)</option>
                <option>Grade 3 (8-9 years)</option>
              </select>

              <input name="mobile" value={formData.mobile} onChange={handleChange}
                className="input-field" placeholder="Parent Mobile Number" />

              <input name="email" value={formData.email} onChange={handleChange}
                className="input-field" placeholder="Email" />

              {!otpSent && (
                <button type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold">
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              )}

              {otpSent && !otpVerified && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input-field"
                  />

                  <button type="button"
                    onClick={verifyOtp}
                    className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold">
                    Verify OTP
                  </button>
                </>
              )}

              {otpVerified && (
                <button type="button"
                  onClick={handlePayment}
                  className="w-full bg-[#ff1e9d] text-white py-2 rounded-xl font-semibold shadow">
                  Pay ₹199 & Register
                </button>
              )}

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
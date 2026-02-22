import TempRegistration from "../models/TempRegistration.js";
import Registration from "../models/registration.js";
import razorpay from "../config/razorpay.js";
import transporter from "../config/mailer.js";
import crypto from "crypto";

// SEND OTP
export const sendOtp = async (req, res) => {
  try {
    const { parentName, childName, className, mobile, email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const temp = await TempRegistration.create({
      parentName,
      childName,
      className,
      mobile,
      email,
      otp,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for Olympiad Registration",
      text: `Your OTP is ${otp}`,
    });

    res.json({ success: true, tempId: temp._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
  const { tempId, otp } = req.body;

  const temp = await TempRegistration.findById(tempId);
  if (!temp) return res.json({ success: false });

  if (temp.otp === otp) {
    temp.otpVerified = true;
    await temp.save();
    return res.json({ success: true });
  }

  res.json({ success: false });
};

// CREATE ORDER
export const createOrder = async (req, res) => {
  const { tempId } = req.body;

  const temp = await TempRegistration.findById(tempId);
  if (!temp || !temp.otpVerified)
    return res.json({ success: false });

  const order = await razorpay.orders.create({
    amount: 19900,
    currency: "INR",
  });

  res.json({
    success: true,
    orderId: order.id,
    amount: order.amount,
    key: process.env.RAZORPAY_KEY_ID,
  });
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    tempId,
  } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature !== razorpay_signature)
    return res.json({ success: false });

  const temp = await TempRegistration.findById(tempId);
  if (!temp || !temp.otpVerified)
    return res.json({ success: false });

  const registration = await Registration.create({
    parentName: temp.parentName,
    childName: temp.childName,
    className: temp.className,
    mobile: temp.mobile,
    email: temp.email,
    paymentId: razorpay_payment_id,
  });

  await TempRegistration.findByIdAndDelete(tempId);

  res.json({
    success: true,
    registrationId: registration._id,
  });
};
import mongoose from "mongoose";

const tempRegistrationSchema = new mongoose.Schema({
  parentName: String,
  childName: String,
  className: String,
  mobile: String,
  email: String,
  otp: String,
  otpVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: 600 },
});

const TempRegistration = mongoose.model("TempRegistration", tempRegistrationSchema);

export default TempRegistration;
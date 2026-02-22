import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  parentName: String,
  childName: String,
  className: String,
  mobile: String,
  email: String,
  paymentId: String,
  createdAt: { type: Date, default: Date.now },
});

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
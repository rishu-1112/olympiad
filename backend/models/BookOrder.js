import mongoose from "mongoose";

const bookOrderSchema = new mongoose.Schema({
  bookId: Number,
  bookTitle: String,
  level: String,
  price: Number,

  customerName: String,
  email: String,
  phone: String,
  address: String,
  pincode: String,
  city: String,
  state: String,

  razorpayOrderId: String,
  paymentId: String,
  shipmentId: String,
  trackingId: String,

  status: {
    type: String,
    default: "CREATED"
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("BookOrder", bookOrderSchema);
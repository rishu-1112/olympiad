import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import BookOrder from "../models/BookOrder.js";
import { getShiprocketToken } from "../config/shiprocket.js";
import axios from "axios";

// ---------------- CREATE ORDER ----------------
export const createBookOrder = async (req, res) => {
  try {
    const { bookId, bookTitle, level, price } = req.body;

    const order = await razorpay.orders.create({
      amount: price * 100,
      currency: "INR",
    });

    await BookOrder.create({
      bookId,
      bookTitle,
      level,
      price,
      razorpayOrderId: order.id,
      status: "PAYMENT_PENDING"
    });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

// ---------------- VERIFY PAYMENT ----------------
export const verifyBookPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerData
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature)
      return res.json({ success: false });

    const order = await BookOrder.findOne({
      razorpayOrderId: razorpay_order_id
    });

    if (!order) return res.json({ success: false });

    // Save customer details
    order.paymentId = razorpay_payment_id;
    order.customerName = customerData.name;
    order.email = customerData.email;
    order.phone = customerData.phone;
    order.address = customerData.address;
    order.pincode = customerData.pincode;
    order.city = customerData.city;
    order.state = customerData.state;
    order.status = "PAID";

    await order.save();

    // 🔥 CREATE SHIPMENT
    const shiprocketToken = await getShiprocketToken();

    const shipment = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      {
        order_id: order._id.toString(),
        order_date: new Date(),
        pickup_location: "Primary",
        billing_customer_name: order.customerName,
        billing_last_name: "",
        billing_address: order.address,
        billing_city: order.city,
        billing_pincode: order.pincode,
        billing_state: order.state,
        billing_country: "India",
        billing_email: order.email,
        billing_phone: order.phone,
        shipping_is_billing: true,
        order_items: [
          {
            name: order.bookTitle,
            sku: "BOOK001",
            units: 1,
            selling_price: order.price
          }
        ],
        payment_method: "Prepaid",
        sub_total: order.price,
        length: 10,
        breadth: 10,
        height: 2,
        weight: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${shiprocketToken}`
        }
      }
    );

    order.shipmentId = shipment.data.order_id;
    order.trackingId = shipment.data.shipment_id;
    order.status = "SHIPPED";

    await order.save();

    res.json({
      success: true,
      orderId: order._id,
      trackingId: order.trackingId
    });

  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ success: false });
  }
};
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Age group mapping for classes
const CLASS_AGE_MAP = {
  "Nursery": "3-4 years",
  "LKG": "4-5 years",
  "UKG": "5-6 years",
  "Grade 1": "6-7 years",
  "Grade 2": "7-8 years",
  "Grade 3": "8-9 years"
};

const getAgeGroup = (className) => CLASS_AGE_MAP[className] || "Not Specified";

// Gmail Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // your gmail
    pass: process.env.EMAIL_PASS   // your app password
  },
});

// Route: Receive registration data
app.post("/register", async (req, res) => {
  const { parentName, childName, className, mobile, email } = req.body;

  // Validate required fields
  if (!parentName || !childName || !mobile || !email) {
    return res.status(400).json({
      success: false,
      message: "All fields including email are required"
    });
  }

  try {
    console.log("Processing registration for:", parentName, "Email:", email);

    // Extract class name from format "Nursery (3-4 years)" -> "Nursery"
    const extractedClassName = className ? className.split('(')[0].trim() : "Not Specified";
    const ageGroup = getAgeGroup(extractedClassName);

    // Email to Admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Olympiad Registration Received",
      html: `
        <h2>New Registration</h2>
        <p><b>Parent Name:</b> ${parentName}</p>
        <p><b>Child Name:</b> ${childName}</p>
        <p><b>Class:</b> ${extractedClassName}</p>
        <p><b>Age Group:</b> ${ageGroup}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Registered at:</b> ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("✅ Admin email sent successfully to:", process.env.ADMIN_EMAIL);

    // Optional: Email to user for confirmation
    if (email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "✅ Registration Confirmed - Olympiad",
        html: `
          <h2>Thank You for Registering!</h2>
          <p>Dear ${parentName},</p>
          <p>Your registration for the Olympiad has been confirmed.</p>
          <p><b>Child's Name:</b> ${childName}</p>
          <p><b>Class:</b> ${extractedClassName}</p>
          <p><b>Age Group:</b> ${ageGroup}</p>
          <p><b>Registration ID:</b> ${Math.floor(100000 + Math.random() * 900000).toString()}</p>
          <p>We will contact you shortly with further details.</p>
          <p>Best regards,<br/>Olympiad Team</p>
        `,
      });
      console.log("✅ Confirmation email sent to user:", email);
    }

    return res.json({
      success: true,
      registrationId: Math.floor(100000 + Math.random() * 900000).toString(),
      message: "Registration successful! Emails sent."
    });

  } catch (error) {
    console.error("❌ Email Error:", error.message);
    console.error("Full error:", error);
    return res.status(500).json({
      success: false,
      message: "Email sending failed. Please check server logs.",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

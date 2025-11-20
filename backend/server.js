import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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

  try {
    // 1️⃣ Email to User
    if (email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "🎉 Registration Successful – Phonics Olympiad",
        html: `
          <h2>Thank you for registering!</h2>
          <p>Hello <b>${parentName}</b>,</p>
          <p>You have successfully registered <b>${childName}</b> for the 
          <strong>Phonics Olympiad</strong>.</p>
          <p>We will contact you soon with further details.</p>
          <br><p>Regards,<br>Phonics Olympiad Team</p>
        `,
      });
    }

    // 2️⃣ Email to Admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Olympiad Registration Received",
      html: `
        <h2>New Registration</h2>
        <p><b>Parent Name:</b> ${parentName}</p>
        <p><b>Child Name:</b> ${childName}</p>
        <p><b>Class:</b> ${className}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Email:</b> ${email || "Not Provided"}</p>
      `,
    });

    return res.json({
      success: true,
      registrationId: Math.floor(100000 + Math.random() * 900000).toString(),
    });


  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({
      success: false,
      message: "Email sending failed"
    });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

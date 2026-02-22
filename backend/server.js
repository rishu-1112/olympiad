import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";



connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", registrationRoutes);
app.use("/", bookRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
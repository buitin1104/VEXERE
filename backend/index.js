import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import busRoute from "./routes/bus.route.js";

dotenv.config();
const port = process.env.PORT || 5000;

await connectDB();

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/buses", busRoute);
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

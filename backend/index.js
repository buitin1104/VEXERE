import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import busRoute from "./routes/bus.route.js";
import busTripRoute from "./routes/busTrip.route.js";
import locationRoute from "./routes/location.route.js";
import requestRoute from "./routes/request.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();
const port = process.env.PORT || 5000;

await connectDB();

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoute);
app.use("/buses", busRoute);
app.use("/bus-trips", busTripRoute);
app.use("/locations", locationRoute);
app.use("/users", userRoute);
app.use("/requests", requestRoute);
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

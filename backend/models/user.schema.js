import mongoose from "mongoose";
import { Role } from "../constants/role.constant.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/,
        "Please enter a valid email address.",
      ],
    },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    roles: [
      {
        type: String,
        required: true,
        enum: Object.values(Role),
      },
    ],
    profilePictureUrl: { type: String, default: null },
    isRequestBusOwner: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
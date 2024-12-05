import mongoose from "mongoose";
import { RequestActionConstant } from "../constants/requestAction.constant.js";

const RequestSchema = new mongoose.Schema({
  actionNeeded: {
    type: String,
    required: true,
    enum: Object.values(RequestActionConstant),
  },
  date: { type: Date, default: Date.now },
  isResolved: { type: Boolean, default: false },
  target: { type: String },
  targetId: { type: String },
});
export default mongoose.model("Request", RequestSchema);

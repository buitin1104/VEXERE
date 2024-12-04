import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusTrip",
    required: true,
  },
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", CommentSchema);

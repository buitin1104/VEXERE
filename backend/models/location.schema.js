import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  coordinates: { type: String, required: true },
});

export default mongoose.model("Location", LocationSchema);


import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  description: { type: String, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);

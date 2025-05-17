import mongoose from "mongoose";

export const SubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true, strict: true }
);

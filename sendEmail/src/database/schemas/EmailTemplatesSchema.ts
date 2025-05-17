import mongoose from "mongoose";

export const EmailTemplatesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    template: { type: String, required: true },
  },
  { timestamps: true, strict: true }
);

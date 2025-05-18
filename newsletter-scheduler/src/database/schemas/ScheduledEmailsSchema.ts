import mongoose from "mongoose";

export const ScheduledEmailsSchema = new mongoose.Schema(
  {
    template: { type: String, required: true },
    variables: { type: String, required: true },
    sent: { type: Boolean, required: true },
    scheduleDate: { type: Date, required: true },
  },
  { timestamps: true, strict: true }
);

ScheduledEmailsSchema.index({ sent: 1 });

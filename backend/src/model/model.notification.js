import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserId",
      required: true,
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameId",
      required: true,
    },
    targetPrice: {
      type: Number,
      required: true,
    },
    isSubscribed: {
      type: Boolean,
      default: true,
    },
    specificPlatform: {
      type: String,
      required: true, // e.g., "Steam", "Epic", etc.
      trim: true,
    },
    email: {
      type: Boolean,
      default: false,
    },
    sms: {
      type: Boolean,
      default: false,
    },
    whatsApp: {
      type: Boolean,
      default: false,
    },
    notifiedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);

import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game", 
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
    specificPlatforms: {
      type: [String], // Array of platform names
      default: [],
    },
    email: {
      type: Boolean,
      default: false,
    },
    sms: {
      type: Boolean,
      default: false,
    },
    notifiedAt: {
      type: Date,
      default: null, // When was the last notification sent (optional)
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);

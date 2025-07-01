import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define the interface for the Notification document
export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  game: mongoose.Types.ObjectId;
  targetPrice: number;
  isSubscribed: boolean;
  specificPlatforms: string[];
  email: boolean;
  sms: boolean;
  whatsApp: boolean;
  notifiedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the schema
const notificationSchema: Schema<INotification> = new Schema(
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
      type: [String],
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

// 3. Create the model
export const Notification: Model<INotification> =
  mongoose.models.Notification || mongoose.model<INotification>("Notification", notificationSchema);

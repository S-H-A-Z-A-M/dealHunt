import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define the interface for the User document
export interface IUser extends Document {
  name: string;
  kindeId: string;
  email: string;
  telegramId: number | null;
  telegramOtp: string | null;
  telegramOtpExpiresAt: Date | null;
  discordId: string | null;
  discordUsername: string | null;   
  discordDmVerified: boolean;
  wishlists: mongoose.Types.ObjectId[];
  friendList: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isNewUser?: boolean;
}

// 2. Define the schema
const userSchema: Schema<IUser> = new Schema(
  {
    kindeId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    telegramId: {
      type: Number,
      unique: true,
      sparse: true,
    },
    telegramOtp: {
      type: String,
      default: null,
    },
    telegramOtpExpiresAt: {
      type: Date,
      default: null,
    },

    // ✅ Discord fields
    discordId: {
      type: String,
      unique: true,
      sparse: true,
      default: null,
    },
    discordUsername: {
      type: String,
      default: null,
    },
    discordDmVerified: {
      type: Boolean,
      default: false,
    },

    // Other relationships
    wishlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist",
      },
    ],
    friendList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isNewUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 3. Create the model
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

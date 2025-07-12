import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define the interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string | null;
  isPhoneVerified: boolean;
  otp?: string | null;
  otpExpiresAt?: Date | null;
  wishlists: mongoose.Types.ObjectId[];
  friendList: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isNewUser?: boolean; // Optional field to track if the user is new
}

// 2. Define the schema
const userSchema: Schema<IUser> = new Schema(
  {
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
    },
    phone: {
      type: String,
      default: null,
      validate: {
        validator: function (v: string | null): boolean {
          return !v || /^[6-9]\d{9}$/.test(v);
        },
        message: (props: any) => `${props.value} is not a valid phone number!`,
      },
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
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
    isNewUser:{
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

// 3. Create the model
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

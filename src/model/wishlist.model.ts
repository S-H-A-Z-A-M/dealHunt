import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWishlist extends Document {
  user: Types.ObjectId;
  name: string;
  description?: string;
  isPublic: boolean;
  games: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema = new Schema<IWishlist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    description: String,
    isPublic: { type: Boolean, default: false },
    games: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
  },
  { timestamps: true }
);

const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
export default Wishlist;

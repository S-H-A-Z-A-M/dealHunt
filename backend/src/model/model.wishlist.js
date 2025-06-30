import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema(
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
  },
  { timestamps: true }
);

// Optional: prevent duplicate wishlist entries for the same user and game
wishlistSchema.index({ user: 1, game: 1 }, { unique: true });

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);

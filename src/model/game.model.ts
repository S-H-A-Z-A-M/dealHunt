import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGame extends Document {
  name: string;
  slug: string;
  backgroundImageURL: string;
  gameScreenshots: string[];
  description?: string;
  platforms: {
    id: string;
    name: string;
  }[];
  genres: string[];
  releaseDate?: string;
  availableStores: {
    id: string;
    name: string;
  }[];
  price: number;
  notificationSettings?: Types.ObjectId;
  priceHistory?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const gameSchema: Schema<IGame> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    backgroundImageURL: { type: String, required: true },
    gameScreenshots: { type: [String], default: [] },
    description: { type: String },
    platforms: [
      {
        id: String,
        name: String,
      },
    ],
    genres: { type: [String], default: [] },
    releaseDate: { type: String },
    availableStores: [
      {
        id: String,
        name: String,
      },
    ],
    price: { type: Number, default: 0 },
    notificationSettings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
    priceHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PriceHistory",
    },
  },
  { timestamps: true }
);

export const Game =
  mongoose.models.Game || mongoose.model<IGame>("Game", gameSchema);

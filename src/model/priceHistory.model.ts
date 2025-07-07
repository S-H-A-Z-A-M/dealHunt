import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPriceEntry {
  price: number;
  currency: string;
  shopId: string;
  shopName?: string;
  date: Date;
}

export interface IPriceHistory extends Document {
  game: mongoose.Types.ObjectId;         // ref to Game model
  itadPlainId: string;                   // used to fetch from ITAD
  history: IPriceEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const priceEntrySchema: Schema<IPriceEntry> = new Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    shopId: {
      type: String,
      required: true,
    },
    shopName: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

const priceHistorySchema: Schema<IPriceHistory> = new Schema(
  {
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    itadPlainId: {
      type: String,
      required: true,
      unique: true, // one document per game
    },
    history: {
      type: [priceEntrySchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const PriceHistory: Model<IPriceHistory> =
  mongoose.models.PriceHistory || mongoose.model<IPriceHistory>("PriceHistory", priceHistorySchema);

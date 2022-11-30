import { Schema } from "mongoose";

export const HouseSchema = new Schema({
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  levels: { type: Number, required: true },
  imgUrl: { type: String, required: true, maxLength: 255 },
  year: { type: Number, required: true },
  description: { type: String }
},
  { timestamps: true, toJSON: { virtuals: true } }
)
import { Schema } from "mongoose";

export const PetSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true, maxLength: 255 },
  imgUrl: { type: String, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }
)
import mongoose, { Schema, Document } from 'mongoose';

export interface IGroceryItem extends Document {
  name: string;
  price: number;
  stock: number;
}

const GroceryItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export default mongoose.model<IGroceryItem>('GroceryItem', GroceryItemSchema);

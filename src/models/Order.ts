import mongoose, { Schema, Document } from "mongoose";

interface IOrderItem {
  groceryItemId: mongoose.Types.ObjectId;
  quantity: number;
}

interface IOrder extends Document {
  email: string; // Store user email instead of userId
  items: IOrderItem[]; // Array of ordered items
  totalAmount: number; // Total cost of the order
  orderDate: Date; // Timestamp of the order
}

const OrderItemSchema: Schema = new Schema<IOrderItem>({
  groceryItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroceryItem",
    required: true,
  },
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema<IOrder>({
  email: { type: String, required: true }, // Store user email
  items: { type: [OrderItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;

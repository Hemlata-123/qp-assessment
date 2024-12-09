import { Request, Response } from "express";
import GroceryItem from "../models/GroceryItem";

// View available grocery items
export const viewAvailableItems = async (req: Request, res: Response) => {
  try {
    const items = await GroceryItem.find({ stock: { $gt: 0 } });
    // Check if no items are available
    if (items.length === 0) {
      res.status(404).json({ message: "No items available" });
    }
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Book groceries
export const bookGroceries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { items } = req.body;
    const bookedItems = [];

    for (const item of items) {
      const groceryItem = await GroceryItem.findById(item.id);
      if (groceryItem && groceryItem.stock >= item.quantity) {
        groceryItem.stock -= item.quantity;
        await groceryItem.save();
        bookedItems.push({ name: groceryItem.name, quantity: item.quantity });
      } else {
        res
          .status(400)
          .json({ message: `Insufficient stock for item: ${item.id}` });
      }
    }

    res.status(200).json({ message: "Booking successful", bookedItems });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

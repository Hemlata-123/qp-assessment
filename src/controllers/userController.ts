import { Request, Response } from "express";
import GroceryItem from "../models/GroceryItem";
import Order from "../models/Order";

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
    const email = req.body.user.email; // Assuming email is available via middleware
    let totalAmount = 0; // Calculate the total order amount
    const bookedItems = [];

    for (const item of items) {
      const groceryItem = await GroceryItem.findById(item.id);

      if (groceryItem && groceryItem.stock >= item.quantity) {
        groceryItem.stock -= item.quantity;
        await groceryItem.save();

        bookedItems.push({
          groceryItemId: groceryItem._id,
          quantity: item.quantity,
        });

        totalAmount += groceryItem.price * item.quantity;
      } else {
        res
          .status(400)
          .json({ message: `Insufficient stock for item: ${groceryItem?.name}` });
        return;
      }
    }

    // Save the order in the database with email
    const newOrder = new Order({
      email, // Store user email instead of userId
      items: bookedItems,
      totalAmount,
    });

    await newOrder.save();

    res.status(200).json({ message: "Booking successful", order: newOrder });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

import { Request, Response } from "express";
import GroceryItem from "../models/GroceryItem";

// Add new grocery item
export const addGroceryItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, stock } = req.body;

    // Ensure 'name' and 'price' are provided, but 'stock' can be 0
    if (!name || !price) {
      res.status(400).json({ message: "Both name and price are required." });
      return;
    }

    // If stock is undefined or null, then it's required; if stock is 0, it's valid.
    if (stock === undefined || stock === null) {
      res
        .status(400)
        .json({
          message: "Stock is required and cannot be null or undefined.",
        });
      return;
    }

    const newItem = new GroceryItem({ name, price, stock });
    await newItem.save();

    res
      .status(201)
      .json({ message: "Grocery item added successfully!", item: newItem });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// View all grocery items
export const viewGroceryItems = async (req: Request, res: Response) => {
  try {
    const items = await GroceryItem.find();
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a grocery item
export const removeGroceryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Check if the grocery item exists
    const item = await GroceryItem.findById(id);
    if (!item) {
      res.status(404).json({ message: "Item not found" });
    }

    // Proceed to remove the item
    await GroceryItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Item removed successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update grocery item details
export const updateGroceryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    // Check if the grocery item exists
    const item = await GroceryItem.findById(id);
    if (!item) {
      res.status(404).json({ message: "Item not found" });
    }
    const updatedItem = await GroceryItem.findByIdAndUpdate(
      id,
      { name, price, stock },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

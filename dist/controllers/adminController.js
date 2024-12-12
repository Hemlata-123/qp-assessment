"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventory = exports.updateGroceryItem = exports.removeGroceryItem = exports.viewGroceryItems = exports.addGroceryItem = void 0;
const GroceryItem_1 = __importDefault(require("../models/GroceryItem"));
// Add new grocery item
const addGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, stock } = req.body;
        // Ensure 'name' and 'price' are provided, but 'stock' can be 0
        if (!name || !price) {
            res.status(400).json({ message: "Both name and price are required." });
            return;
        }
        // If stock is undefined or null, then it's required; if stock is 0, it's valid.
        if (stock === undefined || stock === null) {
            res.status(400).json({
                message: "Stock is required and cannot be null or undefined.",
            });
            return;
        }
        const newItem = new GroceryItem_1.default({ name, price, stock });
        yield newItem.save();
        res
            .status(201)
            .json({ message: "Grocery item added successfully!", item: newItem });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addGroceryItem = addGroceryItem;
// View all grocery items
const viewGroceryItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield GroceryItem_1.default.find();
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.viewGroceryItems = viewGroceryItems;
// Remove a grocery item
const removeGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if the grocery item exists
        const item = yield GroceryItem_1.default.findById(id);
        if (!item) {
            res.status(404).json({ message: "Item not found" });
        }
        // Proceed to remove the item
        yield GroceryItem_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Item removed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.removeGroceryItem = removeGroceryItem;
// Update grocery item details
const updateGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, price } = req.body;
        // Check if the grocery item exists
        const item = yield GroceryItem_1.default.findById(id);
        if (!item) {
            res.status(404).json({ message: "Item not found" });
        }
        const updatedItem = yield GroceryItem_1.default.findByIdAndUpdate(id, { name, price }, { new: true });
        res.status(200).json(updatedItem);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateGroceryItem = updateGroceryItem;
const updateInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // The grocery item ID
        const { stock } = req.body; // The new stock level
        // Validate input
        if (stock == null || isNaN(stock) || stock < 0) {
            res
                .status(400)
                .json({
                message: "Invalid stock value. Must be a non-negative number.",
            });
            return;
        }
        // Find and update the grocery item's stock level
        const updatedItem = yield GroceryItem_1.default.findByIdAndUpdate(id, { stock }, { new: true } // Return the updated document
        );
        if (!updatedItem) {
            res.status(404).json({ message: "Grocery item not found." });
            return;
        }
        res.status(200).json({
            message: "Inventory updated successfully!",
            updatedItem,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateInventory = updateInventory;

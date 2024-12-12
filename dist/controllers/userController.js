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
exports.bookGroceries = exports.viewAvailableItems = void 0;
const GroceryItem_1 = __importDefault(require("../models/GroceryItem"));
const Order_1 = __importDefault(require("../models/Order"));
// View available grocery items
const viewAvailableItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield GroceryItem_1.default.find({ stock: { $gt: 0 } });
        // Check if no items are available
        if (items.length === 0) {
            res.status(404).json({ message: "No items available" });
        }
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.viewAvailableItems = viewAvailableItems;
// Book groceries
const bookGroceries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body;
        const email = req.body.user.email; // Assuming email is available via middleware
        let totalAmount = 0; // Calculate the total order amount
        const bookedItems = [];
        for (const item of items) {
            const groceryItem = yield GroceryItem_1.default.findById(item.id);
            if (groceryItem && groceryItem.stock >= item.quantity) {
                groceryItem.stock -= item.quantity;
                yield groceryItem.save();
                bookedItems.push({
                    groceryItemId: groceryItem._id,
                    quantity: item.quantity,
                });
                totalAmount += groceryItem.price * item.quantity;
            }
            else {
                res
                    .status(400)
                    .json({ message: `Insufficient stock for item: ${groceryItem === null || groceryItem === void 0 ? void 0 : groceryItem.name}` });
                return;
            }
        }
        // Save the order in the database with email
        const newOrder = new Order_1.default({
            email, // Store user email instead of userId
            items: bookedItems,
            totalAmount,
        });
        yield newOrder.save();
        res.status(200).json({ message: "Booking successful", order: newOrder });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.bookGroceries = bookGroceries;

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
// View available grocery items
const viewAvailableItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield GroceryItem_1.default.find({ stock: { $gt: 0 } });
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
        const { items } = req.body; // Expect an array of { id, quantity }
        const bookedItems = [];
        for (const item of items) {
            const groceryItem = yield GroceryItem_1.default.findById(item.id);
            if (groceryItem && groceryItem.stock >= item.quantity) {
                groceryItem.stock -= item.quantity;
                yield groceryItem.save();
                bookedItems.push({ name: groceryItem.name, quantity: item.quantity });
            }
            else {
                return res.status(400).json({ message: `Insufficient stock for item: ${item.id}` });
            }
        }
        res.status(200).json({ message: 'Booking successful', bookedItems });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.bookGroceries = bookGroceries;

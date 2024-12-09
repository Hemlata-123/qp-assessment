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
exports.updateGroceryItem = exports.removeGroceryItem = exports.viewGroceryItems = exports.addGroceryItem = void 0;
const GroceryItem_1 = __importDefault(require("../models/GroceryItem"));
// Add new grocery item
const addGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, stock } = req.body;
        const newItem = yield GroceryItem_1.default.create({ name, price, stock });
        res.status(201).json(newItem);
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
        yield GroceryItem_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Item removed successfully' });
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
        const { name, price, stock } = req.body;
        const updatedItem = yield GroceryItem_1.default.findByIdAndUpdate(id, { name, price, stock }, { new: true });
        res.status(200).json(updatedItem);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateGroceryItem = updateGroceryItem;

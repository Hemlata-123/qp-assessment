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
exports.verifyUser = exports.verifyAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return; // Ensure the function exits after sending a response
    }
    try {
        // Verify the JWT token and decode it
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { email, role } = decoded;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Check if the role is "Admin"
        if (role !== "Admin") {
            res.status(403).json({ message: "Access denied. Admins only." });
            return;
        }
        // Continue to the next middleware or route handler if everything is okay
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
});
exports.verifyAdmin = verifyAdmin;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return; // Ensure the function exits after sending a response
    }
    try {
        // Verify the JWT token and decode it
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { email, role } = decoded;
        // Check if the user exists in the database
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Ensure the role is "User"
        if (role !== "User") {
            res.status(403).json({ message: "Access denied. Users only." });
            return;
        }
        // Add user details to the request object
        req.body.user = { email, role };
        // Continue to the next middleware or route handler
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
});
exports.verifyUser = verifyUser;

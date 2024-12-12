"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get("/groceries", authMiddleware_1.verifyUser, userController_1.viewAvailableItems);
router.post("/bookorder", authMiddleware_1.verifyUser, userController_1.bookGroceries);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/groceries', userController_1.viewAvailableItems);
router.post('/book', userController_1.bookGroceries);
exports.default = router;

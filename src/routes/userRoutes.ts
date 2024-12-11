import { Router } from "express";
import {
  viewAvailableItems,
  bookGroceries,
} from "../controllers/userController";
import { verifyUser } from "../middleware/authMiddleware";

const router = Router();

router.get("/groceries", verifyUser, viewAvailableItems);
router.post("/bookorder", verifyUser, bookGroceries);

export default router;

import { Router } from "express";
import {
  addGroceryItem,
  viewGroceryItems,
  removeGroceryItem,
  updateGroceryItem,
} from "../controllers/adminController";
import { verifyAdmin } from "../middleware/authMiddleware";

const router = Router();

router.post("/addgrocery", verifyAdmin, addGroceryItem);
router.get("/groceries", verifyAdmin, viewGroceryItems);
router.delete("/deletegrocery/:id", verifyAdmin, removeGroceryItem);
router.put("/updategrocery/:id", verifyAdmin, updateGroceryItem);

export default router;

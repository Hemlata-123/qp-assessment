import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return; // Ensure the function exits after sending a response
  }

  try {
    // Verify the JWT token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { email, role } = decoded as any; 
    const user = await User.findOne({ email });
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
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return; // Ensure the function exits after sending a response
  }

  try {
    // Verify the JWT token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { email, role } = decoded as any; 
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the role is "Admin"
    if (role !== "User") {
      res.status(403).json({ message: "Access denied. Users only." });
      return;
    }

    // Continue to the next middleware or route handler if everything is okay
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
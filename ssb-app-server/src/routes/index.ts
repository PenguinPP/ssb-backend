import { Router } from "express";
import UserRouter from "./Users";
import RecipeRouter from "./Recipes";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/users", UserRouter);
router.use("/recipes", RecipeRouter);

// Export the base-router
export default router;

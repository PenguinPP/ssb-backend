import { Router } from "express";
import RecipeRouter from "./Recipes";
import TagsRouter from "./Tags";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/recipes", RecipeRouter);
router.use("/tags", TagsRouter);

// Export the base-router
export default router;

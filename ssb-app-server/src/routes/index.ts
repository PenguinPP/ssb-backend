import { Router } from "express";
import RecipeRouter from "./Recipes";
import TagsRouter from "./Tags";
import IngredientRouter from "./Ingredients";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/recipes", RecipeRouter);
router.use("/tags", TagsRouter);
router.use("/ingredients", IngredientRouter);

// Export the base-router
export default router;

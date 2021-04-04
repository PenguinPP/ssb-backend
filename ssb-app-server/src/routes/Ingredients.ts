import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";
import IngredientDao from "@daos/Ingredient/IngredientDao";
import { paramMissingError, IRequest } from "@shared/constants";
import { param } from "express-validator";

const router = Router();
const ingredientDao = new IngredientDao();
const { NOT_FOUND, OK } = StatusCodes;

/******************************************************************************
 *                      Get All Ingredients - "GET /api/ingredients/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  try {
    const ingredients = await ingredientDao.getAll();
    return res.status(OK).json({ ingredients });
  } catch (err) {
    return res.status(NOT_FOUND).json({ error: err.message });
  }
});

export default router;

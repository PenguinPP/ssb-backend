import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";
import RecipeDao from "@daos/Recipe/RecipeDao";
import { paramMissingError, IRequest } from "@shared/constants";

const router = Router();
const recipeDao = new RecipeDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/******************************************************************************
 *                      Get All Recipes - "GET /api/recipes/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  const users = await recipeDao.getAll();
  return res.status(OK).json({ users });
});

export default router;

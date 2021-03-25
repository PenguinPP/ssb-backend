import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";
import RecipeDao from "@daos/Recipe/RecipeDao";
import { paramMissingError, IRequest } from "@shared/constants";
import { param } from 'express-validator';

const router = Router();
const recipeDao = new RecipeDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/******************************************************************************
 *                      Get All Recipes - "GET /api/recipes/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  const recipes = await recipeDao.getAll();
  return res.status(OK).json({ recipes });
});

/******************************************************************************
 *                      Get All Recipes Previews - "GET /api/recipes/previews"
 ******************************************************************************/

 router.get("/previews", async (req: Request, res: Response) => {
  const recipes = await recipeDao.getAllPreviews();
  return res.status(OK).json({ recipes });
});

/******************************************************************************
 *                      Get Recipe By Id - "GET /api/recipes/:recipeId"
 ******************************************************************************/

 router.get("/:recipeId", [param("recipeId").not().isEmpty()], async (req: Request, res: Response) => {
  const recipes = await recipeDao.getRecipeById(parseInt(req.params.recipeId));
  return res.status(OK).json({ recipes });
});



export default router;

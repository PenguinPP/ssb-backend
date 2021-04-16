import request from "supertest";
import express from "express";
import RecipeRoutes from "../../src/routes/Recipes";
import { jest } from "@jest/globals";

const app = express();

app.use("/recipe", RecipeRoutes);

jest.mock("/recipes/all", () => {
  return {
    recipes: [
      {
        recipe_id: "mock-id-1",
        recipe_name: "mock-name-1",
        recipe_picture: "mock-picture-1",
        all_ingredients: ["mock-ingredient-1", "mock-ingredient-2"],
        main_ingredients: ["mock-main-ingredient-1", "mock-main-ingredient-2"],
        ingredient_amounts: ["250", "100"],
        ingredient_units: ["g", "g"],
        ingredient_prep: ["diced", "chopped"],
      },
      {
        recipe_id: "mock-id-2",
        recipe_name: "mock-name-2",
        recipe_picture: "mock-picture-2",
        all_ingredients: ["mock-ingredient-3", "mock-ingredient-4"],
        main_ingredients: ["mock-main-ingredient-3", "mock-main-ingredient-4"],
        ingredient_amounts: ["50", "90"],
        ingredient_units: ["lbs", "kg"],
        ingredient_prep: ["smashed", "rekt"],
      },
    ],
  };
});

describe("Recipe Routes", () => {
  it("GET /recipes/all", async () => {
    const { body } = await request(app).get("/all");
    expect(body).toEqual({
      recipes: [
        {
          recipe_id: "mock-id-1",
          recipe_name: "mock-name-1",
          recipe_picture: "mock-picture-1",
          all_ingredients: ["mock-ingredient-1", "mock-ingredient-2"],
          main_ingredients: [
            "mock-main-ingredient-1",
            "mock-main-ingredient-2",
          ],
          ingredient_amounts: ["250", "100"],
          ingredient_units: ["g", "g"],
          ingredient_prep: ["diced", "chopped"],
        },
        {
          recipe_id: "mock-id-2",
          recipe_name: "mock-name-2",
          recipe_picture: "mock-picture-2",
          all_ingredients: ["mock-ingredient-3", "mock-ingredient-4"],
          main_ingredients: [
            "mock-main-ingredient-3",
            "mock-main-ingredient-4",
          ],
          ingredient_amounts: ["50", "90"],
          ingredient_units: ["lbs", "kg"],
          ingredient_prep: ["smashed", "rekt"],
        },
      ],
    });
  });
});

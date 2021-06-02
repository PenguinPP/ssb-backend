import request from "supertest";
import { jest, expect } from "@jest/globals";
import app from "../../src/Server";
import { driver } from "neo4j-driver";

jest.mock("neo4j-driver", () => ({
  driver: () => ({
    session: () => ({
      run: () => ({
        records: [
          {
            toObject: () => ({
              recipe_id: "recipe_id",
              recipe_name: "recipe_name",
              recipe_picture: "recipe_picture",
              all_ingredients: "all_ingredients",
              main_ingredients: "main_ingredients",
              ingredient_amounts: "ingredient_amounts",
              ingredient_units: "ingredient_units",
              ingredient_prep: "ingredient_prep",
            }),
          },
        ],
      }),
      close: jest.fn(),
    }),
  }),
  auth: {
    basic: jest.fn(),
  },
}));

describe("Recipe API Requests", () => {
  test("GET /api/recipes/all returns a valid list of recipes", async () => {
    const response = await request(app).get("/api/recipes/all");

    expect(response.body).toHaveProperty("recipes");
    expect(response.body.recipes).toEqual(expect.any(Array));
    expect(response.body.recipes).toContainEqual({
      recipe_id: "recipe_id",
      recipe_name: "recipe_name",
      recipe_picture: "recipe_picture",
      all_ingredients: "all_ingredients",
      main_ingredients: "main_ingredients",
      ingredient_amounts: "ingredient_amounts",
      ingredient_units: "ingredient_units",
      ingredient_prep: "ingredient_prep",
    });
  });

  // test("GET /api/recipes/previews returns a valid list of recipe previews", async () => {
  //   const response = await request(app).get("/api/recipes/previews");

  //   expect(response.body).toHaveProperty("recipes");
  //   expect(response.body.recipes).toEqual(expect.any(Array));
  //   // expect(response.body.recipes).toContainEqual({
  //   //   recipe_id: "recipe_id",
  //   //   recipe_name: "recipe_name",
  //   //   main_ingredients: "main_ingredients",
  //   // });
  // });
});

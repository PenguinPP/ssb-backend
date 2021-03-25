import Recipe, { IRecipe } from "@entities/Recipe";
import neo4j = require("neo4j-driver");

export interface IRecipeDao {
  getAll: () => Promise<IRecipe[]>;
}

class RecipeDao implements IRecipeDao {
  public async getAll(): Promise<IRecipe[]> {
    let driver = neo4j.driver(
      process.env.NEO4J_URL || "",
      neo4j.auth.basic(
        process.env.NEO4J_USER || "",
        process.env.NEO4J_PASSWORD || ""
      )
    );

    let session = driver.session();
    let result = await session.run(
      `MATCH (r:recipe)-[:HAS_MAIN_INGREDIENT]->(m:ingredient)
            WITH collect(m.name) AS main_ingredients, r
            MATCH (r)-[c:CONTAINS_INGREDIENT]->(i:ingredient)
            WITH collect(i.name) AS all_ingredients, r, main_ingredients, collect(c.amount) AS ingredient_amounts, collect(c.unit) AS ingredient_units, 
            collect (c.preparation) AS ingredient_prep
            RETURN r.recipeId AS recipe_id, r.name AS recipe_name, r.picture AS recipe_picture, main_ingredients, all_ingredients, ingredient_amounts, ingredient_units, ingredient_prep;`
    );

    return result.records.map((record) => {
      const {
        recipe_id,
        recipe_name,
        recipe_picture,
        all_ingredients,
        main_ingredients,
        ingredient_amounts,
        ingredient_prep,
        ingredient_units,
      } = record.toObject();
      const recipe: IRecipe = {
        recipe_id: recipe_id,
        recipe_name: recipe_name,
        recipe_picture: recipe_picture,
        all_ingredients: all_ingredients,
        main_ingredients: main_ingredients,
        ingredient_amounts: ingredient_amounts,
        ingredient_units: ingredient_units,
        ingredient_prep: ingredient_prep,
      };
      return recipe;
    });
  }
}

export default RecipeDao;

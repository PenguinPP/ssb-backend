import neo4jDriver from "@daos/SsbDB/Neo4jDriverDao";
import { IRecipe } from "@entities/Recipe";
import { IRecipePreview } from "@entities/RecipePreview";
import neo4j = require("neo4j-driver");

export interface IRecipeDao {
  getAll: () => Promise<IRecipe[]>;
  getAllPreviews: () => Promise<IRecipePreview[]>;
  getRecipeById: (recipeId: number) => Promise<IRecipe>;
}

class RecipeDao implements IRecipeDao {
  public async getAll(): Promise<IRecipe[]> {
    let session = neo4jDriver.session();

    try {
      let result = await session.run(
        `MATCH (r:Recipe)-[:HAS_MAIN_INGREDIENT]->(m:Ingredient)
            WITH collect(m.name) AS main_ingredients, r
            MATCH (r)-[c:CONTAINS_INGREDIENT]->(i:Ingredient)
            WITH collect(i.name) AS all_ingredients, r, main_ingredients, collect(c.amount) AS ingredient_amounts, collect(c.unit) AS ingredient_units, 
            collect (c.preparation) AS ingredient_prep
            RETURN r.id AS recipe_id, r.name AS recipe_name, r.picture AS recipe_picture, main_ingredients, all_ingredients, ingredient_amounts, ingredient_units, ingredient_prep;`
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
    } catch (error) {
      throw error;
    } finally {
      session.close();
    }
  }

  public async getAllPreviews(): Promise<IRecipePreview[]> {
    let session = neo4jDriver.session();

    try {
      let result = await session.run(
        `MATCH (r:Recipe)-[:HAS_MAIN_INGREDIENT]->(m:Ingredient)
            WITH collect(m.name) AS main_ingredients, r
            MATCH (r)-[:HAS_TAG]->(t:Tag)
            WITH collect(t.name) AS recipe_tags, r, main_ingredients
            RETURN r.name AS recipe_name, r.id AS recipe_id, recipe_tags, main_ingredients;`
      );

      return result.records.map((record) => {
        const {
          recipe_name,
          recipe_id,
          recipe_tags,
          main_ingredients,
        } = record.toObject();

        const recipe_preview: IRecipePreview = {
          recipe_name: recipe_name,
          recipe_id: recipe_id,
          recipe_tags: recipe_tags,
          main_ingredients: main_ingredients,
        };

        return recipe_preview;
      });
    } catch (error) {
      throw error;
    } finally {
      session.close();
    }
  }

  public async getRecipeById(recipeId: number): Promise<IRecipe> {
    let session = neo4jDriver.session();

    try {
      let result = await session.run(
        `MATCH (r:Recipe)-[:HAS_MAIN_INGREDIENT]->(m:Ingredient)
            WHERE r.id = $selectedRecipeId 
            WITH collect(m.name) AS main_ingredients, r
            MATCH (r)-[c:CONTAINS_INGREDIENT]->(i:Ingredient)
            WITH collect(i.name) AS all_ingredients, r, main_ingredients, collect(c.amount) AS ingredient_amounts, collect(c.unit) AS ingredient_units, collect (c.preparation) AS ingredient_prep
            RETURN r.id AS recipe_id, r.name AS recipe_name, main_ingredients, all_ingredients, ingredient_amounts, ingredient_units, ingredient_prep;`,
        { selectedRecipeId: recipeId }
      );

      if (result.records.length == 0) {
        throw new Error("recipeId provided does not exist.");
      }
      const record = result.records[0];
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

      return Promise.resolve(recipe);
    } catch (error) {
      throw error;
    } finally {
      session.close();
    }
  }
}

export default RecipeDao;

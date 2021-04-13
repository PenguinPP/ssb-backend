import neo4jDriver from "@daos/SsbDB/Neo4jDriverDao";
import Ingredient, { IIngredient } from "@entities/Ingredient";
import neo4j = require("neo4j-driver");

export interface IIngredientDao {
  getAll: () => Promise<IIngredient[]>;
}

class IngredientDao implements IIngredientDao {
  public async getAll(): Promise<IIngredient[]> {
    let session = neo4jDriver.session();
    try {
      let result = await session.run(
        `MATCH (t:Ingredient)
          RETURN t.name AS ingredient_name;`
      );

      return result.records.map((record) => {
        const { ingredient_name } = record.toObject();
        const ingredient: Ingredient = {
          ingredient_name: ingredient_name,
        };

        return ingredient;
      });
    } catch (error) {
      throw error;
    } finally {
      session.close();
    }
  }
}

export default IngredientDao;

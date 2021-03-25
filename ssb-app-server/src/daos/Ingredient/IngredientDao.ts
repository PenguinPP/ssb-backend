import Ingredient, { IIngredient } from "@entities/Ingredient";
import neo4j = require("neo4j-driver");
import neo4jDriver from "@daos/SsbDB/Neo4jDriverDao";

export interface IIngredientDao {
  getAll: () => Promise<IIngredient[]>;
}

class IngredientDao implements IIngredientDao {
  public async getAll(): Promise<IIngredient[]> {
    let session = neo4jDriver.session();
    let result = await session.run(
      `MATCH (t:ingredient)
          RETURN t.name AS ingredient_name;`
    );
    session.close();

    return result.records.map((record) => {
      const { ingredient_name } = record.toObject();
      const ingredient: Ingredient = {
        ingredient_name: ingredient_name,
      };

      return ingredient;
    });
  }
}

export default IngredientDao;

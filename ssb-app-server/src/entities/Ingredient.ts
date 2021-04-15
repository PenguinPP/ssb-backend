export interface IIngredient {
  ingredient_id: String;
  ingredient_name: String;
}

class Ingredient implements IIngredient {
  public ingredient_id: String;
  public ingredient_name: String;

  constructor(ingredient: IIngredient) {
    this.ingredient_id = ingredient.ingredient_id;
    this.ingredient_name = ingredient.ingredient_name;
  }
}

export default Ingredient;

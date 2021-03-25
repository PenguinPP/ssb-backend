export interface IIngredient {
  ingredient_name: String;
}

class Ingredient implements IIngredient {
  public ingredient_name: String;

  constructor(ingredient: IIngredient) {
    this.ingredient_name = ingredient.ingredient_name;
  }
}

export default Ingredient;

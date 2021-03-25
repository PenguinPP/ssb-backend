import { IIdentity } from "./Identity";

export interface IRecipe {
  recipe_id: IIdentity;
  recipe_name: String;
  recipe_picture: String;
  all_ingredients: String[];
  main_ingredients: String[];
  ingredient_amounts: String[];
  ingredient_units: String[];
  ingredient_prep: String[];
}

class Recipe implements IRecipe {
  public recipe_id: IIdentity;
  public recipe_name: String;
  public recipe_picture: String;
  public all_ingredients: String[];
  public main_ingredients: String[];
  public ingredient_amounts: String[];
  public ingredient_units: String[];
  public ingredient_prep: String[];

  constructor(recipe: IRecipe) {
    this.recipe_name = recipe.recipe_name;
    this.recipe_id = recipe.recipe_id;
    this.recipe_picture = recipe.recipe_picture;
    this.all_ingredients = recipe.all_ingredients;
    this.main_ingredients = recipe.main_ingredients;
    this.ingredient_amounts = recipe.ingredient_amounts;
    this.ingredient_units = recipe.ingredient_units;
    this.ingredient_prep = recipe.ingredient_prep;
  }
}

export default Recipe;

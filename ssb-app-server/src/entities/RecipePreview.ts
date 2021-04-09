import { IIdentity } from './Identity';

export interface IRecipePreview {
    recipe_name: String,
    recipe_id: IIdentity,
    recipe_tags: String[],
    main_ingredients: String[]
}

class RecipePreview implements IRecipePreview{
    public recipe_name: String
    public recipe_id: IIdentity
    public recipe_tags: String[]
    public main_ingredients: String[]

    constructor (recipePreview: IRecipePreview){
        this.recipe_name = recipePreview.recipe_name;
        this.recipe_id = recipePreview.recipe_id;
        this.recipe_tags = recipePreview.recipe_tags;
        this.main_ingredients = recipePreview.main_ingredients;
    }
}

export default RecipePreview;

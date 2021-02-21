# ssb-backend

Code for application server and database queries.

## Available api calls

#### /api/recipePreviews

Returns all recipes and their preview details (ID, Name, list of main ingredients, list of tags)

#### /api/recipeDetails

Returns all recipes, information on ingredients (amount and units) and a list of main ingredients for each recipe.

#### /api/recipes

Returns all recipes (no information on ingredients)

#### /api/ingredients

Returns all ingredients

#### /api/mainIngredients

Returns all main ingredients

#### /api/tags

Returns all tags

#### /api/recipe/:recipeId

Returns all details for a specific recipe (id, ingredients, main ingredients, amounts and units for ingredients, name, pictureLink, method)

# ssb-backend

Code for application server and database queries.

## Available api calls

#### /api/recipes/previews

Returns all recipes and their preview details (ID, Name, list of main ingredients, list of tags)

#### /api/recipes/details

Returns all recipes, information on ingredients (amount, units and prep), a list of main ingredients and a list of tags for each recipe.

#### /api/ingredients/all

Returns all ingredients

#### /api/tags/all

Returns all tags

#### /api/recipe/:recipeId

Returns all details for a specific recipe (id, ingredients, main ingredients, amounts, units and prep for ingredients, name, pictureLink, method)

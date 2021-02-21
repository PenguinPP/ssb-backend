//Return all recipes with list of main ingredient and list of all ingredients (with amounts)
MATCH (r:recipe)-[:HAS_MAIN_INGREDIENT]->(m:ingredient)
WITH collect(m.name) AS main_ingredients, r
MATCH (r)-[c:CONTAINS_INGREDIENT]->(i:ingredient)
WITH collect(i) AS all_ingredients, r, main_ingredients, collect(c) AS ingredient_amounts
RETURN r, main_ingredients, all_ingredients, ingredient_amounts;

//Return Recipe Preview details (ID, Name, list of main ingredients, list of tags)
MATCH (r:recipe)-[:HAS_MAIN_INGREDIENT]->(m:ingredient)
WITH collect(m.name) AS main_ingredients, r
MATCH (r)-[:HAS_TAG]->(t:tag)
WITH collect(t) AS tags, r, main_ingredients
RETURN r.name, r.recipeId, tags, main_ingredients

//Return all details for specific recipe
MATCH (r:recipe)-[:HAS_MAIN_INGREDIENT]->(m:ingredient)
WHERE r.recipeId = $selectedRecipeId 
WITH collect(m.name) AS main_ingredients, r
MATCH (r)-[c:CONTAINS_INGREDIENT]->(i:ingredient)
WITH collect(i) AS all_ingredients, r, main_ingredients, collect(c) AS ingredient_amounts
RETURN r, main_ingredients, all_ingredients, ingredient_amounts;

//Return all ingredients
MATCH (i:ingredient)
RETURN i;


//Return all recipes
MATCH (r:recipe)
RETURN r;

//Return all tags
MATCH (t:tags)
RETURN t;

//Return list of main ingredients
MATCH (r:recipe)-[c:HAS_MAIN_INGREDIENT]-(i:ingredient)
WITH collect(i.name) AS main_ingredients
RETURN main_ingredients;
//Queries to be run on database by application server

//Return all recipes with list of main ingredient and list of all ingredients (with amounts)
MATCH (r:Recipe)-[:HAS_MAIN_INGREDIENT]->(m:Ingredient)
WITH collect(m.name) AS main_ingredients, r
MATCH (r)-[c:CONTAINS_INGREDIENT]->(i:Ingredient)
WITH collect(i.name) AS all_ingredients, r, main_ingredients, collect(c.amount) AS ingredient_amounts, collect(c.unit) AS ingredient_units, collect (c.preparation) AS ingredient_prep
RETURN r.id AS recipe_id, r.name AS recipe_name, r.picture AS recipe_picture, main_ingredients, all_ingredients, ingredient_amounts, ingredient_units, ingredient_prep;


//Return Recipe Preview details (ID, Name, list of main ingredients, list of tags)
MATCH (r:Recipe)-[:HAS_MAIN_INGREDIENT]->(m:Ingredient)
WITH collect(m.name) AS main_ingredients, r
MATCH (r)-[:HAS_TAG]->(t:Tag)
WITH collect(t.name) AS recipe_tags, r, main_ingredients
RETURN r.name AS recipe_name, r.id AS recipe_id, recipe_tags, main_ingredients;

//Return all details for specific recipe
MATCH (r:Recipe)-[:HAS_MAIN_INGREDIENT]->(m:Ingredient)
WHERE r.id = $selectedRecipeId 
WITH collect(m.name) AS main_ingredients, r
MATCH (r)-[c:CONTAINS_INGREDIENT]->(i:Ingredient)
WITH collect(i.name) AS all_ingredients, r, main_ingredients, collect(c.amount) AS ingredient_amounts, collect(c.unit) AS ingredient_units, collect (c.preparation) AS ingredient_prep
RETURN r.id AS recipe_id, r.name AS recipe_name, main_ingredients, all_ingredients, ingredient_amounts, ingredient_units, ingredient_prep;

//Return all ingredients
MATCH (t:Ingredient)
RETURN t.id AS ingredient_id, t.name AS ingredient_name;

//Return all tags
MATCH (t:Tag)
RETURN t.id AS tag_id, t.name AS tag_name;

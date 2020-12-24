WITH "file:///mealdb-collated.csv" AS url
CALL apoc.load.csv(url) YIELD value
UNWIND value.ingredientList AS ingredient
MERGE (r:recipe {id: value.idMeal})
MERGE (i:Ingredient {name: ingredient})
MERGE (r) - [:CONTAINS_INGREDIENT] -> (i)
ON CREATE SET r.name = value.name,
                r.method = value.steps
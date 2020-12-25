WITH "file:///mealdb-collated.csv" AS url
CALL apoc.load.csv(url) YIELD name, idMeal, ingredientList, Tags, steps
UNWIND ingredientList AS ingredient
UNWIND Tags AS tagName
MERGE (r:recipe {id: idMeal})
MERGE (i:ingredient {name: ingredient})
MERGE (t:tag {name: tagName})
MERGE (r) - [:CONTAINS_INGREDIENT] -> (i)
MERGE (r) - [:HAS_TAG] -> (t)
ON CREATE SET r.name = name,
                r.method = steps
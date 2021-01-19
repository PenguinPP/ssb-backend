CALL apoc.load.csv("file:///cleaned-recipes.csv", {header: true,
    mapping:{
        idMeal: {type: 'int'},
        ingredientList: {array:true, arraySep: ','},
        tags: {array:true, arraySep: ','},
        unitsList: {array:true, arraySep: ','},
    }
})
YIELD map
UNWIND map.ingredientList AS singleIngredient
UNWIND map.tags AS singleTag
UNWIND map.unitsList AS singleUnit
MERGE (r:recipe{recipeId: map.idMeal})
MERGE (i:ingredient {name: singleIngredient})
MERGE (t:tag {name: singleTag})
MERGE (r) - [c:CONTAINS_INGREDIENT] -> (i)
MERGE (r) - [h:HAS_TAG] -> (t)
ON CREATE SET r.name = map.name,
                r.method = map.steps,
                r.picture = map.pictureLink,
                c.unit = singleUnit,




                c.amount = singleAmount,
                c.preparation = singlePrep
        amountList: {array:true, arraySep: ','},
        ingredientPrep: {array:true, arraySep: ','},
        mainIngredient: {array:true, arraySep: ','}

                
MERGE (r) - [:HAS_MAIN_INGREDIENT] -> (mi)

MERGE (mi:ingredient {name: singleMainIngredient})













CALL apoc.load.csv("file:///small-cleaned-recipes.csv", {header: true,
    mapping:{
        idMeal: {type: 'int'},
        ingredientList: {array:true, arraySep: ','},
        unitsList: {array:true, arraySep: ','},
        amountList: {array:true, arraySep: ','}
    }
})
YIELD map
UNWIND map.ingredientList AS singleIngredient
UNWIND map.unitsList AS singleUnit
UNWIND map.amountList AS singleAmount
MERGE (r:recipe{recipeId: map.idMeal})
MERGE (i:ingredient {name: singleIngredient})
MERGE (r) - [c:CONTAINS_INGREDIENT] -> (i)
ON CREATE SET r.name = map.name,
                c.unit = singleUnit,
                c.amount = singleAmount
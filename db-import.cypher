CALL apoc.load.csv("file:///cleaned-recipes.csv", {header: true,
    mapping:{
        idMeal: {type: 'int'},
        ingredientList: {array:true, arraySep: ','},
        tags: {array:true, arraySep: ','},
        unitsList: {array:true, arraySep: ','},
        amountList: {array:true, arraySep:','},
        ingredientPrep: {array:true, arraySep: ','}
    }
})
YIELD map
WITH collect(map) AS recipe_collection
FOREACH (rc IN recipe_collection | 
    MERGE (r:recipe{recipeId: rc.idMeal})
    FOREACH (ing IN range(0,size(rc.ingredientList)-1,1) |
        MERGE (i:ingredient {name: rc.ingredientList[ing]})
        MERGE (r) - [c:CONTAINS_INGREDIENT] -> (i)
        SET c.unit = rc.unitsList[ing], c.preparation = rc.ingredientPrep[ing], c.amount = rc.amountList[ing]
        )
    SET r.name = rc.name, r.method = rc.steps, r.picture = rc.pictureLink
    )



//Ignore everything below this

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
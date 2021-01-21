
//Import Recipes and create ingredient relationships
CALL apoc.load.csv("file:///cleaned-recipes.csv", {header: true,
    mapping:{
        idMeal: {type: 'int'},
        ingredientList: {array:true, arraySep: ','},
        tags: {array:true, arraySep: ','},
        unitsList: {array:true, arraySep: ','},
        amountList: {array:true, arraySep:','},
        ingredientPrep: {array:true, arraySep: ','},
        mainIngredients: {array:true, arraySep: ','}
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
    );

//Import recipes and create main ingredient relationships and tags
CALL apoc.load.csv("file:///cleaned-recipes.csv", {header: true,
    mapping:{
        idMeal: {type: 'int'},
        ingredientList: {array:true, arraySep: ','},
        tags: {array:true, arraySep: ','},
        unitsList: {array:true, arraySep: ','},
        amountList: {array:true, arraySep:','},
        ingredientPrep: {array:true, arraySep: ','},
        mainIngredients: {array:true, arraySep: ','}
    }
})
YIELD map
UNWIND map.mainIngredients AS singleIngredient
UNWIND map.Tags AS singleTag
MERGE (r:recipe{recipeId: map.idMeal})
MERGE (i:ingredient {name: singleIngredient})
MERGE (t:tag {name: singleTag})
MERGE (r) - [c:HAS_MAIN_INGREDIENT] -> (i)
MERGE (r) - [:HAS_TAG] -> (t);
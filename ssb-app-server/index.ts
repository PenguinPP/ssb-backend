import express = require('express');
import neo4j = require('neo4j-driver')
import * as dotenv from 'dotenv'
import { param } from 'express-validator';

dotenv.config()

const app = express()
const port = 8080;


//Listen on port 8080
app.listen(port, () =>
  console.log(`SSB App Server listening on port ${port}!`)
);


//Server Welcome
app.get("/", (req, res) => {
    res.send("-Restricted Area- \nSSB Application Server \n -Restricted Area- ")
})


//Get all recipes and details for ingredients and main ingredients
app.get( "/api/recipeDetails", async function ( req, res )  {

    const allRecipes = await getAllRecipeDetails()

    res.send(allRecipes.records);
} );

async function getAllRecipeDetails(){
    let driver = neo4j.driver(
        process.env.NEO4J_URL || "",
        neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || "")
    )

    let session = driver.session()
    let result = await session
        .run(
            `MATCH (r:recipe)-[:HAS_MAIN_INGREDIENT]->(m:ingredient)
            WITH collect(m.name) AS main_ingredients, r
            MATCH (r)-[c:CONTAINS_INGREDIENT]->(i:ingredient)
            WITH collect(i) AS all_ingredients, r, main_ingredients, collect(c) AS ingredient_amounts
            RETURN r, main_ingredients, all_ingredients, ingredient_amounts;
`
        )

    return result
}


//Get all Recipes
app.get( "/api/recipes", async function ( req, res )  {

    const allRecipes = await getAllRecipes()

    res.send(allRecipes.records);
} );

//Connect to neo4j server and run query to get all recipes
async function getAllRecipes(){
    let driver = neo4j.driver(
        process.env.NEO4J_URL || "",
        neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || "")
    )

    let session = driver.session()
    let result = await session
        .run(
            `MATCH (r:recipe)
          RETURN r;`
        )

    return result
}

//Get all ingredients
app.get("/api/ingredients" , async function (req, res) {
    const allIngredients = await getAllIngredients()
    res.send(allIngredients.records)
})

//Connect to neo4j server and run query to get all ingredients
async function getAllIngredients(){
    let driver = neo4j.driver(
        process.env.NEO4J_URL || "",
        neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || "")
    )

    let session = driver.session()
    let result = await session
        .run(
            `MATCH (i:ingredient)
          RETURN i;`
        )

    return result
}

//Get all tags
app.get("/api/tags" , async function (req, res) {
    const allTags = await getAllTags()
    res.send(allTags.records)
})

//Connect to neo4j server and run query to get all tags
async function getAllTags(){
    let driver = neo4j.driver(
        process.env.NEO4J_URL || "",
        neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || "")
    )

    let session = driver.session()
    let result = await session
        .run(
            `MATCH (t:tag)
          RETURN t;`
        )

    return result
}

// Get all main ingredients
app.get("/api/mainIngredients" , async function (req, res) {
    const allMainIngredients = await getMainIngredients()
    res.send(allMainIngredients.records)
})

//Connect to neo4j server and run query to get all main ingredients
async function getMainIngredients(){
    let driver = neo4j.driver(
        process.env.NEO4J_URL || "",
        neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || "")
    )

    let session = driver.session()
    let result = await session
        .run(
            `MATCH (r:recipe)-[c:HAS_MAIN_INGREDIENT]-(i:ingredient)
            WITH collect(i.name) AS main_ingredients
            RETURN main_ingredients;`
        )

    return result
}


//Get Recipe Preview details (ID, Name, list of main ingredients, list of tags)
app.get("/api/recipePreviews" , async function (req, res) {
    const allRecipePreviews = await getRecipePreviews()
    res.send(allRecipePreviews.records)
})

//Connect to neo4j server and run query to get Recipe Preview details (ID, Name, list of main ingredients, list of tags)
async function getRecipePreviews(){
    let driver = neo4j.driver(
        process.env.NEO4J_URL || "",
        neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || "")
    )

    let session = driver.session()
    let result = await session
        .run(
            `MATCH (r:recipe)-[:HAS_MAIN_INGREDIENT]->(m:ingredient)
            WITH collect(m.name) AS main_ingredients, r
            MATCH (r)-[:HAS_TAG]->(t:tag)
            WITH collect(t) AS tags, r, main_ingredients
            RETURN r.name AS recipe_name, r.recipeId AS id, tags, main_ingredients;`
        )

    return result
}

//Get Recipe Preview details (ID, Name, list of main ingredients, list of tags)
app.get("/api/recipePreviews" , async function (req, res) {
    const allRecipePreviews = await getRecipePreviews()
    res.send(allRecipePreviews.records)
})

//Get data for specific recipe
app.get("/api/recipe/:recipeId", [param("recipeId").not().isEmpty()], async function (req, res){
    const specificRecipeDetails = await getSpecificRecipeDetails(parseInt(req.params.recipeId))
    console.log(typeof parseInt(req.params.recipeId))
    res.send(specificRecipeDetails.records)
})


async function getSpecificRecipeDetails(recipeId: number){
    let driver = neo4j.driver(
        process.env.NEO4J_URL || "",
        neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || "")
    )

    let session = driver.session()
    let result = await session
        .run(
            `MATCH (r:recipe)-[:HAS_MAIN_INGREDIENT]->(m:ingredient)
            WHERE r.recipeId = $selectedRecipeId 
            WITH collect(m.name) AS main_ingredients, r
            MATCH (r)-[c:CONTAINS_INGREDIENT]->(i:ingredient)
            WITH collect(i) AS all_ingredients, r, main_ingredients, collect(c) AS ingredient_amounts
            RETURN r, main_ingredients, all_ingredients, ingredient_amounts;`,
            {selectedRecipeId : recipeId}
        )

    return result
}
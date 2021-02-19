import express = require('express');
import neo4j = require('neo4j-driver')
import * as dotenv from 'dotenv'
const { param } = require('express-validator');

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

    res.send(allRecipes);
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

    res.send(allRecipes);
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
    res.send(allIngredients)
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
    res.send(allTags)
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

app.get("/api/mainIngredients" , async function (req, res) {
    const allTags = await getMainIngredients()
    res.send(allTags)
})

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
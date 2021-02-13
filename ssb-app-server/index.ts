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

// //Get all recipes containing main ingredient
// app.get("/api/recipes/mainingredient/:ingredient",[param('ingredient').not().isEmpty()] , async function (req, res) {

//     console.log(param('ingredient'))
//     const recipes = await getRecipeFromMainIngredient(param('ingredient'))
//     res.send(recipes)
// })

// //Connect to neo4j server and get recipes with specified main ingredient

// async function getRecipeFromMainIngredient(ingredient: string) {
// let driver = neo4j.driver(
//         process.env.NEO4J_URL || "",
//         neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || "")
//     )

//     let session = driver.session()
//     let result = await session
//         .run(
//             `MATCH (r:recipe) - [:HAS_MAIN_INGREDIENT] -> (i:ingredient)
//             WHERE ingredient.name = $ingredientName
//           RETURN r;`,
//           {ingredientName: ingredient}
//         )

//     return result
// }
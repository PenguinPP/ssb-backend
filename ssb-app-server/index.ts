import express = require('express');
import neo4j = require('neo4j-driver')
import * as dotenv from 'dotenv'
import { param } from 'express-validator';
import * as swaggerUi from 'swagger-ui-express';
import {swaggerDocument} from './swagger';

dotenv.config()

const app = express()
const port = 8080;


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//Listen on port 8080
app.listen(port, () =>
  console.log(`SSB App Server listening on port ${port}!`)
);


//Server Welcome
app.get("/api", (req, res) => {
    res.send("-Restricted Area- \nSSB Application Server \n -Restricted Area- ")
})

type Identity = {
    low: number,
    high: number
}

type Recipe = {
    recipe_id: Identity,
    recipe_name: String,
    recipe_picture: String,
    all_ingredients: String[],
    main_ingredients: String[],
    ingredient_amounts: String[],
    ingredient_units: String[],
    ingredient_prep: String[]
};


//Get all recipes and details for ingredients and main ingredients
app.get( "/api/recipes/details", async function ( req, res )  {

    const allRecipes : Recipe[] = await getAllRecipeDetails()

    res.send(allRecipes);
});

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
            WITH collect(i.name) AS all_ingredients, r, main_ingredients, collect(c.amount) AS ingredient_amounts, collect(c.unit) AS ingredient_units, 
            collect (c.preparation) AS ingredient_prep
            RETURN r.recipeId AS recipe_id, r.name AS recipe_name, r.picture AS recipe_picture, main_ingredients, all_ingredients, ingredient_amounts, ingredient_units, ingredient_prep;`
        )
    
    return result.records.map((record) => {
        const {recipe_id, recipe_name, recipe_picture, all_ingredients, main_ingredients, ingredient_amounts, ingredient_prep, ingredient_units} = record.toObject();
        const recipe : Recipe = {
            recipe_id: recipe_id,
            recipe_name: recipe_name,
            recipe_picture: recipe_picture,
            all_ingredients: all_ingredients,
            main_ingredients: main_ingredients,
            ingredient_amounts: ingredient_amounts,
            ingredient_units: ingredient_units,
            ingredient_prep: ingredient_prep
        }
        return recipe;
    })
}

type Ingredient = {
    ingredient_name: String
}

//Get all ingredients
app.get("/api/ingredients/all" , async function (req, res) {
    const allIngredients : Ingredient[] = await getAllIngredients()
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
          RETURN i.name AS ingredient_name;`
        )

    return result.records.map((record) => {
        const {ingredient_name} = record.toObject()
        const ingredient : Ingredient = {
            ingredient_name: ingredient_name
        }
        
        return ingredient;
    })
}

type Tag = {
    tag_name: String
}

//Get all tags
app.get("/api/tags/all" , async function (req, res) {
    const allTags : Tag[] = await getAllTags()
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
          RETURN t.name AS tag_name;`
        )

    return result.records.map((record) => {
        const {tag_name} = record.toObject()
        const tag : Tag = {
            tag_name: tag_name
        }

        return tag;
    })
}

type RecipePreview = {
    recipe_name: String,
    recipe_id: Identity,
    recipe_tags: String[],
    main_ingredients: String[]
}

//Get Recipe Preview details (ID, Name, list of main ingredients, list of tags)
app.get("/api/recipes/previews" , async function (req, res) {
    const allRecipePreviews : RecipePreview[] = await getRecipePreviews()
    res.send(allRecipePreviews)
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
            WITH collect(t.name) AS recipe_tags, r, main_ingredients
            RETURN r.name AS recipe_name, r.recipeId AS recipe_id, recipe_tags, main_ingredients;`
        )
    
    return result.records.map((record) => {
        const {recipe_name, recipe_id, recipe_tags, main_ingredients} = record.toObject()

        const recipe_preview : RecipePreview = {
            recipe_name: recipe_name,
            recipe_id: recipe_id,
            recipe_tags: recipe_tags,
            main_ingredients: main_ingredients
        }

        return recipe_preview;
    })
}

//Get data for specific recipe
app.get("/api/recipe/:recipeId", [param("recipeId").not().isEmpty()], async function (req, res){
    const specificRecipeDetails : Recipe = await getSpecificRecipeDetails(parseInt(req.params.recipeId))
    
    res.send(specificRecipeDetails)
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
            WITH collect(i.name) AS all_ingredients, r, main_ingredients, collect(c.amount) AS ingredient_amounts, collect(c.unit) AS ingredient_units, collect (c.preparation) AS ingredient_prep
            RETURN r.recipeId AS recipe_id, r.name AS recipe_name, main_ingredients, all_ingredients, ingredient_amounts, ingredient_units, ingredient_prep;`,
            {selectedRecipeId : recipeId}
        )
    console.log(result.records.map(record => record.toObject()))

    const record = result.records[0]
    const {recipe_id, recipe_name, recipe_picture, all_ingredients, main_ingredients, ingredient_amounts, ingredient_prep, ingredient_units} = record.toObject();

    const recipe : Recipe = {
            recipe_id: recipe_id,
            recipe_name: recipe_name,
            recipe_picture: recipe_picture,
            all_ingredients: all_ingredients,
            main_ingredients: main_ingredients,
            ingredient_amounts: ingredient_amounts,
            ingredient_units: ingredient_units,
            ingredient_prep: ingredient_prep
        }

    return recipe
}
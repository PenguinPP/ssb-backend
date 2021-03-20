"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var neo4j = require("neo4j-driver");
var dotenv = require("dotenv");
var express_validator_1 = require("express-validator");
var swaggerUi = require("swagger-ui-express");
var swagger_1 = require("./swagger");
dotenv.config();
var app = express();
var port = 8080;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger_1.swaggerDocument));
//Listen on port 8080
app.listen(port, function () {
    return console.log("SSB App Server listening on port " + port + "!");
});
//Server Welcome
app.get("/api", function (req, res) {
    res.send("-Restricted Area- \nSSB Application Server \n -Restricted Area- ");
});
//Get all recipes and details for ingredients and main ingredients
app.get("/api/recipes/details", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allRecipes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllRecipeDetails()];
                case 1:
                    allRecipes = _a.sent();
                    res.send(allRecipes);
                    return [2 /*return*/];
            }
        });
    });
});
function getAllRecipeDetails() {
    return __awaiter(this, void 0, void 0, function () {
        var driver, session, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    driver = neo4j.driver(process.env.NEO4J_URL || "", neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || ""));
                    session = driver.session();
                    return [4 /*yield*/, session
                            .run("MATCH (r:recipe)-[:HAS_MAIN_INGREDIENT]->(m:ingredient)\n            WITH collect(m.name) AS main_ingredients, r\n            MATCH (r)-[c:CONTAINS_INGREDIENT]->(i:ingredient)\n            WITH collect(i.name) AS all_ingredients, r, main_ingredients, collect(c.amount) AS ingredient_amounts, collect(c.unit) AS ingredient_units, \n            collect (c.preparation) AS ingredient_prep\n            RETURN r.recipeId AS recipe_id, r.name AS recipe_name, r.picture AS recipe_picture, main_ingredients, all_ingredients, ingredient_amounts, ingredient_units, ingredient_prep;")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.records.map(function (record) {
                            var _a = record.toObject(), recipe_id = _a.recipe_id, recipe_name = _a.recipe_name, recipe_picture = _a.recipe_picture, all_ingredients = _a.all_ingredients, main_ingredients = _a.main_ingredients, ingredient_amounts = _a.ingredient_amounts, ingredient_prep = _a.ingredient_prep, ingredient_units = _a.ingredient_units;
                            var recipe = {
                                recipe_id: recipe_id,
                                recipe_name: recipe_name,
                                recipe_picture: recipe_picture,
                                all_ingredients: all_ingredients,
                                main_ingredients: main_ingredients,
                                ingredient_amounts: ingredient_amounts,
                                ingredient_units: ingredient_units,
                                ingredient_prep: ingredient_prep
                            };
                            return recipe;
                        })];
            }
        });
    });
}
//Get all ingredients
app.get("/api/ingredients/all", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allIngredients;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllIngredients()];
                case 1:
                    allIngredients = _a.sent();
                    res.send(allIngredients);
                    return [2 /*return*/];
            }
        });
    });
});
//Connect to neo4j server and run query to get all ingredients
function getAllIngredients() {
    return __awaiter(this, void 0, void 0, function () {
        var driver, session, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    driver = neo4j.driver(process.env.NEO4J_URL || "", neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || ""));
                    session = driver.session();
                    return [4 /*yield*/, session
                            .run("MATCH (i:ingredient)\n          RETURN i.name AS ingredient_name;")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.records.map(function (record) {
                            var ingredient_name = record.toObject().ingredient_name;
                            var ingredient = {
                                ingredient_name: ingredient_name
                            };
                            return ingredient;
                        })];
            }
        });
    });
}
//Get all tags
app.get("/api/tags/all", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allTags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllTags()];
                case 1:
                    allTags = _a.sent();
                    res.send(allTags);
                    return [2 /*return*/];
            }
        });
    });
});
//Connect to neo4j server and run query to get all tags
function getAllTags() {
    return __awaiter(this, void 0, void 0, function () {
        var driver, session, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    driver = neo4j.driver(process.env.NEO4J_URL || "", neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || ""));
                    session = driver.session();
                    return [4 /*yield*/, session
                            .run("MATCH (t:tag)\n          RETURN t.name AS tag_name;")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.records.map(function (record) {
                            var tag_name = record.toObject().tag_name;
                            var tag = {
                                tag_name: tag_name
                            };
                            return tag;
                        })];
            }
        });
    });
}
//Get Recipe Preview details (ID, Name, list of main ingredients, list of tags)
app.get("/api/recipes/previews", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allRecipePreviews;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRecipePreviews()];
                case 1:
                    allRecipePreviews = _a.sent();
                    res.send(allRecipePreviews);
                    return [2 /*return*/];
            }
        });
    });
});
//Connect to neo4j server and run query to get Recipe Preview details (ID, Name, list of main ingredients, list of tags)
function getRecipePreviews() {
    return __awaiter(this, void 0, void 0, function () {
        var driver, session, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    driver = neo4j.driver(process.env.NEO4J_URL || "", neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || ""));
                    session = driver.session();
                    return [4 /*yield*/, session
                            .run("MATCH (r:recipe)-[:HAS_MAIN_INGREDIENT]->(m:ingredient)\n            WITH collect(m.name) AS main_ingredients, r\n            MATCH (r)-[:HAS_TAG]->(t:tag)\n            WITH collect(t.name) AS recipe_tags, r, main_ingredients\n            RETURN r.name AS recipe_name, r.recipeId AS recipe_id, recipe_tags, main_ingredients;")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.records.map(function (record) {
                            var _a = record.toObject(), recipe_name = _a.recipe_name, recipe_id = _a.recipe_id, recipe_tags = _a.recipe_tags, main_ingredients = _a.main_ingredients;
                            var recipe_preview = {
                                recipe_name: recipe_name,
                                recipe_id: recipe_id,
                                recipe_tags: recipe_tags,
                                main_ingredients: main_ingredients
                            };
                            return recipe_preview;
                        })];
            }
        });
    });
}
//Get data for specific recipe
app.get("/api/recipe/:recipeId", [express_validator_1.param("recipeId").not().isEmpty()], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var specificRecipeDetails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSpecificRecipeDetails(parseInt(req.params.recipeId))];
                case 1:
                    specificRecipeDetails = _a.sent();
                    res.send(specificRecipeDetails);
                    return [2 /*return*/];
            }
        });
    });
});
function getSpecificRecipeDetails(recipeId) {
    return __awaiter(this, void 0, void 0, function () {
        var driver, session, result, record, _a, recipe_id, recipe_name, recipe_picture, all_ingredients, main_ingredients, ingredient_amounts, ingredient_prep, ingredient_units, recipe;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    driver = neo4j.driver(process.env.NEO4J_URL || "", neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || ""));
                    session = driver.session();
                    return [4 /*yield*/, session
                            .run("MATCH (r:recipe)-[:HAS_MAIN_INGREDIENT]->(m:ingredient)\n            WHERE r.recipeId = $selectedRecipeId \n            WITH collect(m.name) AS main_ingredients, r\n            MATCH (r)-[c:CONTAINS_INGREDIENT]->(i:ingredient)\n            WITH collect(i.name) AS all_ingredients, r, main_ingredients, collect(c.amount) AS ingredient_amounts, collect(c.unit) AS ingredient_units, collect (c.preparation) AS ingredient_prep\n            RETURN r.recipeId AS recipe_id, r.name AS recipe_name, main_ingredients, all_ingredients, ingredient_amounts, ingredient_units, ingredient_prep;", { selectedRecipeId: recipeId })];
                case 1:
                    result = _b.sent();
                    console.log(result.records.map(function (record) { return record.toObject(); }));
                    record = result.records[0];
                    _a = record.toObject(), recipe_id = _a.recipe_id, recipe_name = _a.recipe_name, recipe_picture = _a.recipe_picture, all_ingredients = _a.all_ingredients, main_ingredients = _a.main_ingredients, ingredient_amounts = _a.ingredient_amounts, ingredient_prep = _a.ingredient_prep, ingredient_units = _a.ingredient_units;
                    recipe = {
                        recipe_id: recipe_id,
                        recipe_name: recipe_name,
                        recipe_picture: recipe_picture,
                        all_ingredients: all_ingredients,
                        main_ingredients: main_ingredients,
                        ingredient_amounts: ingredient_amounts,
                        ingredient_units: ingredient_units,
                        ingredient_prep: ingredient_prep
                    };
                    return [2 /*return*/, recipe];
            }
        });
    });
}

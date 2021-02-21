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
var param = require('express-validator').param;
dotenv.config();
var app = express();
var port = 8080;
//Listen on port 8080
app.listen(port, function () {
    return console.log("SSB App Server listening on port " + port + "!");
});
//Server Welcome
app.get("/", function (req, res) {
    res.send("-Restricted Area- \nSSB Application Server \n -Restricted Area- ");
});
//Get all recipes and details for ingredients and main ingredients
app.get("/api/recipeDetails", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allRecipes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllRecipeDetails()];
                case 1:
                    allRecipes = _a.sent();
                    res.send(allRecipes.records);
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
                            .run("MATCH (r:recipe)-[:HAS_MAIN_INGREDIENT]->(m:ingredient)\n            WITH collect(m.name) AS main_ingredients, r\n            MATCH (r)-[c:CONTAINS_INGREDIENT]->(i:ingredient)\n            WITH collect(i) AS all_ingredients, r, main_ingredients, collect(c) AS ingredient_amounts\n            RETURN r, main_ingredients, all_ingredients, ingredient_amounts;\n")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
//Get all Recipes
app.get("/api/recipes", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allRecipes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllRecipes()];
                case 1:
                    allRecipes = _a.sent();
                    res.send(allRecipes.records);
                    return [2 /*return*/];
            }
        });
    });
});
//Connect to neo4j server and run query to get all recipes
function getAllRecipes() {
    return __awaiter(this, void 0, void 0, function () {
        var driver, session, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    driver = neo4j.driver(process.env.NEO4J_URL || "", neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || ""));
                    session = driver.session();
                    return [4 /*yield*/, session
                            .run("MATCH (r:recipe)\n          RETURN r;")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
//Get all ingredients
app.get("/api/ingredients", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allIngredients;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllIngredients()];
                case 1:
                    allIngredients = _a.sent();
                    res.send(allIngredients.records);
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
                            .run("MATCH (i:ingredient)\n          RETURN i;")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
//Get all tags
app.get("/api/tags", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allTags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllTags()];
                case 1:
                    allTags = _a.sent();
                    res.send(allTags.records);
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
                            .run("MATCH (t:tag)\n          RETURN t;")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
app.get("/api/mainIngredients", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allTags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMainIngredients()];
                case 1:
                    allTags = _a.sent();
                    res.send(allTags);
                    return [2 /*return*/];
            }
        });
    });
});
function getMainIngredients() {
    return __awaiter(this, void 0, void 0, function () {
        var driver, session, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    driver = neo4j.driver(process.env.NEO4J_URL || "", neo4j.auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || ""));
                    session = driver.session();
                    return [4 /*yield*/, session
                            .run("MATCH (r:recipe)-[c:HAS_MAIN_INGREDIENT]-(i:ingredient)\n            WITH collect(i.name) AS main_ingredients\n            RETURN main_ingredients;")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}

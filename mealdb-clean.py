import csv
import urllib.request
import json


recipe_list = csv.DictReader(open('mealdb-recipes.csv'))

collated_recipes = []


for recipe in recipe_list:
    print(recipe['idMeal'])

    # Fetch recipe information and load information as dict object
    url = 'https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=' + \
        recipe['idMeal']

    pulled_info = json.loads(urllib.request.urlopen(url).read())
    recipe_info = pulled_info['meals'][0]

    # Format ingredients and amounts
    recipe['ingredientList'] = []
    recipe['amountList'] = []
    recipe['unitsList'] = []

    i = 1
    while i <= 20:

        # Append ingredient i to ingredient list
        ingredient_number = 'strIngredient' + str(i)

        if recipe_info[ingredient_number] is not None and recipe_info[ingredient_number] != '':
            recipe['ingredientList'].append(recipe_info[ingredient_number])

        # Split measure i into amount and unit

        measureString = 'strMeasure' + str(i)
        # print(recipe_info[measureString])

        if recipe_info[measureString] is not None:
            # length of string containing measure amount and units
            measureLength = len(recipe_info[measureString])

            if measureLength == 1:
                if recipe_info[measureString].isdigit():

                    recipe['amountList'].append(recipe_info[measureString])
                    recipe['unitsList'].append('')

                else:
                    recipe['amountList'].append('')
                    recipe['unitsList'].append(recipe_info[measureString])

            else:
                j = measureLength - 1
                while j >= 0:
                    if recipe_info[measureString][j].isdigit():
                        measureAmount = recipe_info[measureString][:j+1]
                        measureUnit = recipe_info[measureString][j+1:].strip()

                        recipe['amountList'].append(measureAmount)
                        recipe['unitsList'].append(measureUnit)
                        break
                    else:
                        j = j - 1

        i = i + 1

    # Format steps into list and add to recipe object
    recipe_steps = recipe_info['strInstructions'].splitlines()

    recipe_steps = [x for x in recipe_steps if x != '']

    recipe['steps'] = recipe_steps

    # Add recipe name
    recipe['name'] = recipe_info['strMeal']

    # add picture
    recipe['pictureLink'] = recipe_info['strMealThumb']

    collated_recipes.append(recipe)

with open('mealdb-collated.csv', 'w', newline='') as output_file:
    dict_writer = csv.DictWriter(output_file, collated_recipes[0].keys())
    dict_writer.writeheader()
    dict_writer.writerows(collated_recipes)

print('recipes saved')

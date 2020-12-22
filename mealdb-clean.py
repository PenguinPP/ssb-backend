import csv
import urllib.request


recipe_list = csv.DictReader(open('mealdb-recipes.csv'))

for row in recipe_list:
    print(row['idMeal'])
    url = 'https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=' + \
        row['idMeal']

    recipe_info = urllib.request.urlopen(url).read()

    print(recipe_info)

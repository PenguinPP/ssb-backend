import csv

recipe_list = csv.DictReader(
    open('../data/cleaned-recipes-utf-8-v2.csv', encoding="utf-8-sig"))


for recipe in recipe_list:
    units_list = recipe["unitsList"].split(',')
    print(units_list)

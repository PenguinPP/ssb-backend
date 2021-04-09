import csv

try:
    tag_list = csv.DictReader(open('../data/tag-categories.csv'))
    recipe_list = csv.DictReader(
        open('../data/cleaned-recipes.csv', encoding="UTF-8"))

    dish_name_change_list = csv.DictReader(
        open('../data/dish-name-changes.csv'))

    old_dish_names = []
    new_dish_names = []

    for row in dish_name_change_list:
        old_dish_names.append(row["old_name"])
        new_dish_names.append(row["new_name"].strip())

    unwanted_tag_categories = ["protein", "carb",
                               "vegetable and fruit", "dairy", "pantry"]

    i = 0

    for recipe in recipe_list:
        print(recipe["idMeal"])

except UnicodeDecodeError as e:
    offending = e.object[e.start:e.end]
    print("this is what you're printing", offending)
    seen_text = e.object[:e.start]
    print(seen_text)
    line_no = seen_text.count(b'\n') + 1
    [print(line_no)]
    raise

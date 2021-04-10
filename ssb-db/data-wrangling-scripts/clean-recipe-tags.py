import csv

try:
    tag_list = csv.DictReader(open('../data/tag-categories.csv'))
    recipe_list = csv.DictReader(
        open('../data/cleaned-recipes-utf-8.csv', encoding="utf-8-sig"))

    dish_name_change_list = csv.DictReader(
        open('../data/dish-name-changes.csv'))

    old_dish_names = []
    new_dish_names = []

    for row in dish_name_change_list:
        old_dish_names.append(row["old_name"])
        new_dish_names.append(row["new_name"].strip())

    unwanted_tag_categories = ["protein", "carb",
                               "vegetable and fruit", "dairy", "pantry"]

    unwanted_tags = []

    cleaned_recipe_list = []

    for tag in tag_list:
        for category in unwanted_tag_categories:
            if tag[category]:
                unwanted_tags.append(tag[category])

    tags_removed = 0
    tags_name_changed = 0

    for recipe in recipe_list:
        current_tag_list = recipe["tags"].split(',')
        new_tag_list = []
        for index, recipe_tag in enumerate(current_tag_list):

            # change tag names that need changing
            if recipe_tag in old_dish_names:
                current_tag_list[index] = new_dish_names[old_dish_names.index(
                    recipe_tag)]
                tags_name_changed += 1

            # remove unwanted tags
            if recipe_tag not in unwanted_tags:
                new_tag_list.append(recipe_tag)

        # replace old tag list with new tag list
        recipe["tags"] = str(new_tag_list)

        cleaned_recipe_list.append(recipe)
    print(tags_removed, tags_name_changed)

    with open('../data/cleaned-recipes-utf-8-v2.csv', 'w', encoding='utf-8-sig', newline='') as output_file:
        dict_writer = csv.DictWriter(
            output_file, cleaned_recipe_list[0].keys())
        dict_writer.writeheader()
        dict_writer.writerows(cleaned_recipe_list)

except UnicodeDecodeError as e:
    offending = e.object[e.start:e.end]
    print("this is what you're printing", offending)
    seen_text = e.object[:e.start]
    print(seen_text)
    line_no = seen_text.count(b'\n') + 1
    [print(line_no)]
    raise

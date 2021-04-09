import csv

tag_list = csv.DictReader(open('../data/tag-categories.csv'))
dish_name_change_list = csv.DictReader(open('../data/dish-name-changes.csv'))

old_dish_names = []
new_dish_names = []


for row in dish_name_change_list:
    old_dish_names.append(row["old_name"])
    new_dish_names.append(row["new_name"].strip())

tag_categories = ["dish name", "dish type", "cuisine",
                  "dietary", "cooking method", "equipment", "flavour", "spices"]

# Categorise tags
categorised_tags = []

wanted_categories = []


for tag in tag_list:

    if not tag["dish name"]:
        continue
    else:
        if tag["dish name"] in old_dish_names:

            tag["dish name"] = new_dish_names[old_dish_names.index(
                tag["dish name"])]

    for category in tag_categories:
        if not tag[category]:
            continue
        else:
            categorised_tags.append(
                {"category_name": category, "tag_name": tag[category]})

# Save categorised tags to csv
with open('../data/organised-tags.csv', 'w', encoding='utf-8-sig', newline='') as output_file:
    dict_writer = csv.DictWriter(output_file, categorised_tags[0].keys())
    dict_writer.writeheader()
    dict_writer.writerows(categorised_tags)

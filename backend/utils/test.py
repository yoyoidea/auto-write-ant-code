class format_dict(dict):
    def __missing__(self, key):
        return ""

d = format_dict({"modelName": "database", "title": "DatabaseList"})

with open('list.js') as f:
    list_content = f.read()
    print(list_content % d)

print("My %(foo)s  %(foo)s is %(bar)s {xxx}" % d) # "My name is ..."
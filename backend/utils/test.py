import json


class format_dict(dict):
    def __missing__(self, key):
        return ""


renderFormCol = """
          <Col md={8} sm={24}>
            <Form.Item label="%(label)s">
              {getFieldDecorator('%(name)s')(
                <Input placeholder="请输入" />
            )}
            </Form.Item>
          </Col>"""

d = format_dict({
    "modelName": "database",
    "columns": [{
        "title": "名称",
        "dataIndex": "name"
    },
        {
            "title": "类型",
            "dataIndex": "databaseTypeName"
        }
    ],
    "formCol": [{
        "label": "名称",
        "name": "name"
    }],
    "title": "DatabaseList"
})

# 构造simple form 和 advance form
formCol = d["formCol"]

formColList = list()

if formCol:
    for col in formCol:
        formColList.append((renderFormCol % col).lstrip())
    d["advancedFromCol"] = "".join(formColList)
    d["simpleFromCol"] = "".join(formColList[:2])

with open('list.js') as f:
    list_content = f.read()
    page = list_content % d
    with open("test.js", 'w') as wf:
        wf.write(page)

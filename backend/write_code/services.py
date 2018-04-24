import json

from common.const import *
from utils.response import success_response_data


class FormatDict(dict):
    def __missing__(self, key):
        return ""


RenderFormCol = """
          <Col md={8} sm={24}>
            <Form.Item label="%(label)s">
              {getFieldDecorator('%(name)s')(
                <Input placeholder="请输入" />
            )}
            </Form.Item>
          </Col>"""


def dict_to_dict_str(data):
    # 生成dict字符格式
    count = 0
    data_str_format = ""
    dict_format = '{%(data)s }'
    data_list = list()
    for index, key in enumerate(data):
        data_list.append(key)
        if data[key] is True or data[key] is False:
            data_list.append(str(data[key]).lower())
            if index != len(data) - 1:
                data_str_format += " {0[" + str(count) + "]}: {0[" + str(count + 1) + "]},"
            else:
                data_str_format += " {0[" + str(count) + "]}: {0[" + str(count + 1) + "]}"
        else:
            data_list.append(data[key])
            if index != len(data) - 1:
                data_str_format += " {0[" + str(count) + "]}: '{0[" + str(count + 1) + "]}',"
            else:
                data_str_format += " {0[" + str(count) + "]}: '{0[" + str(count + 1) + "]}'"
        count += 2
    data_str = dict_format % (dict(data=data_str_format.format(data_list)))
    return data_str


def list_to_list_str(data_list):
    list_format = '[{data}]'
    data_str_format = ""
    for index, data in enumerate(data_list):
        if index != len(data_list) - 1:
            data_str_format += dict_to_dict_str(data) + ', '
        else:
            data_str_format += dict_to_dict_str(data)
    print("data_str_format", data_str_format)
    return list_format.format(data=data_str_format)


def write_list_page(data):
    format_data = FormatDict(data)

    # 构造simple form 和 advance form
    form_col = format_data.get("formCol")

    form_col_list = list()

    if form_col:
        for col in form_col:
            form_col_list.append((RenderFormCol % col).lstrip())
        format_data["advancedFromCol"] = "".join(form_col_list)
        format_data["simpleFromCol"] = "".join(form_col_list[:2])
        print(format_data["columns"])
        format_data["columns"] = list_to_list_str(format_data["columns"])

    with open('media/list/list.js') as f:
        list_content = f.read()
        page = list_content % format_data
    with open('media/list/test.js', 'w') as wf:
        wf.write(page)
    return success_response_data(page)


DescriptionListStr = """
            <DescriptionList size="large" title="%(title)s" style={{ marginBottom: 32 }}>
              %(description)s
            </DescriptionList>
"""

Description = """
              <Description term="%(term)s">{ this.state.data.%(key)s }</Description>"""


def write_detail_page(data):
    format_data = FormatDict(data)

    # 构造simple form 和 advance form
    form_col = format_data.get("detail")

    init_data = dict()
    description_list_str = ""
    if form_col:
        for col in form_col:
            description_str = ""
            for detail in col.get("list"):
                key = detail.get("key")
                if key:
                    init_data[key] = ""
                description_str += Description % detail
            # print(description_str)
            description_str = description_str.lstrip()
            description_dict = dict()
            description_dict['description'] = description_str
            description_dict['title'] = col.get('title')
            description_list_str += DescriptionListStr % description_dict
        format_data["initData"] = dict_to_dict_str(init_data)
        format_data["descriptionList"] = description_list_str.lstrip()
    print(format_data)
    with open('media/detail/detail.js') as f:
        list_content = f.read()
        page = list_content % format_data
    with open('media/detail/test.js', 'w') as wf:
        wf.write(page)
    return success_response_data(page)


FieldsTypeDict = {
    "Input": '<Input placeholder="%(placeholder)s" />',
    "TextArea": '<TextArea placeholder="%(placeholder)s" />',
    "Select": """<Select placeholder="%(placeholder)s" />'
                    {this.state.%(option)s}
                 </Select>""",
    "DatePicker": '<DatePicker placeholder="%(placeholder)s"/>',
    "InputNumber": '<InputNumber placeholder="%(placeholder)s"/>',
    "AutoComplete": """<AutoComplete
                    dataSource=""
                    placeholder="input here"
                  />""",
}

FieldForm = """
            <FormItem {...formItemLayout} label="%(label)s">
              {getFieldDecorator('%(name)s', {
                rules: %(rules)s,
              })(%(field)s)}
            </FormItem>
"""


def write_add_page(data):
    format_data = FormatDict(data)
    form_col = format_data.get("fields")
    form_item_str = ''
    import_field_list = list()
    if form_col:
        for col in form_col:
            field_type = col.get('type')
            field = FieldsTypeDict.get(field_type) % col
            # 统计需要导入的import field
            import_field_list.append(field_type)
            col['field'] = field
            col['rules'] = list_to_list_str(col.get('rules'))
            form_item_str += FieldForm % col
    format_data['formItem'] = form_item_str.lstrip()
    format_data['importFields'] = ", ".join(list(set(import_field_list)))
    with open('media/form/add.js') as f:
        list_content = f.read()
        page = list_content % format_data
    with open('media/form/test.js', 'w') as wf:
        wf.write(page)
    return success_response_data(page)

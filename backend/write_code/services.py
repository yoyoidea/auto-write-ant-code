from common.const import *
from utils.response import success_response_data


class FormatDict(dict):
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


def write_list_page(data):
    format_data = FormatDict(data)

    # 构造simple form 和 advance form
    form_col = format_data.get("formCol")

    form_col_list = list()

    if form_col:
        for col in form_col:
            form_col_list.append((renderFormCol % col).lstrip())
        format_data["advancedFromCol"] = "".join(form_col_list)
        format_data["simpleFromCol"] = "".join(form_col_list[:2])

    with open('media/list/list.js') as f:
        list_content = f.read()
        page = list_content % format_data
    return success_response_data(page)

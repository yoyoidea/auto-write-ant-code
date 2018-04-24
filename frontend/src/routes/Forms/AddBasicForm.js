import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Button, Card, InputNumber, Input } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;

@connect(({ loading }) => ({
  submitting: loading.effects['database/add'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'database/add',
          payload: values,
        });
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout
        title="增加数据库数据"
        content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="名字">
              {getFieldDecorator('name', {
                rules: [{ required: false, message: '请输入标题' }],
              })(<Input placeholder="给目标起个名字" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="端口">
              {getFieldDecorator('port', {
                rules: [{ required: false, message: '请输入端口号' }],
              })(<InputNumber placeholder="整数"/>)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}

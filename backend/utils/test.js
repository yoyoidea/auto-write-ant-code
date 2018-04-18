/* eslint-disable prefer-destructuring */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Icon,
  Button,
  Popconfirm,
  Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getAuthority } from '../../utils/authority';
import styles from './style/DatabaseList.less';

@connect(({ database, loading }) => ({
  database,
  loading: loading.models.database,
}))

@Form.create()
export default class DatabaseList extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [{'title': '名称', 'dataIndex': 'name'}, {'title': '类型', 'dataIndex': 'databaseTypeName'}];
    if (getAuthority() !== 'user') {
      this.columns.push(
        {
          title: '操作',
          render: record => (
            <Fragment>
              <Link to={`/asset/database/${record.id}/edit`}>编辑</Link>
              <Divider type="vertical" />
              <Popconfirm title="确定删除该项?" onConfirm={() => this.onDelete(record.id)}>
                <a>删除</a>
              </Popconfirm>
            </Fragment>
          ),
        }
      );
    }
  }

  state = {
    // modalVisible: false,
    expandForm: false,
    selectedRows: [],
    // formValues: {},
    data: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    pagination: {},
  };


  componentDidMount() {
    this.fetch();
  }

  onDelete = (key) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'database/remove',
      payload: { id: key },
    }).then(() => {
      this.fetch();
    });
  };

  // 分页
  fetch = (params = {}) => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: 'database/fetch',
        payload: {
          ...params,
          ...fieldsValue,
        },
      }).then(() => {
        let { database: { data } } = this.props;
        if (data === null) {
          data = this.state.data;
        }
        const pagination = { ...this.state.pagination };
        pagination.total = data.count;
        data.pagination = pagination;
        this.setState({ data });
      });
    });
  };

  handleStandardTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      limit: pagination.pageSize,
      offset: (pagination.current - 1) * pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };


  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.fetch();
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.fetch();
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="名称">
              {getFieldDecorator('name')(
                <Input placeholder="请输入" />
            )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="名称">
              {getFieldDecorator('name')(
                <Input placeholder="请输入" />
            )}
            </Form.Item>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }


  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { loading } = this.props;
    const { selectedRows } = this.state;
    return (
      <PageHeaderLayout title="数据库列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Link to="/asset/database/add">
                <Button icon="plus" type="primary">新建</Button>
              </Link>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={this.state.data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}

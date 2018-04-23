import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Spin, Badge } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Description } = DescriptionList;

@connect(({ database, loading }) => ({
  database,
  loading: loading.effects['%(modelName)s/detail'],
}))

export default class BasicProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: %(initData)s,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: '%(modelName)s/detail',
      payload: { ...this.props.match.params },
    }).then(() => {
      const { database: { data } } = this.props;
      if (data !== undefined && data !== null) {
        this.setState({ data });
      }
    });
  }

  render() {
    const { loading } = this.props;
    return (
      <Spin tip="Loading..." spinning={loading}>
        <PageHeaderLayout title="%(title)s">
          <Card bordered={false}>
            %(descriptionList)s
          </Card>
        </PageHeaderLayout>
      </Spin>
    );
  }
}

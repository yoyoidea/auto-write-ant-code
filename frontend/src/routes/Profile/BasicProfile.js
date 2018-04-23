import React, { PureComponent } from 'react';
import CodeMirror from 'react-codemirror'
import { JSHINT } from 'jshint'
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Button,
  Icon,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import '../../../node_modules/codemirror/addon/lint/json-lint.js'
import '../../../node_modules/codemirror/addon/lint/lint.js'
import '../../../node_modules/codemirror/addon/lint/javascript-lint.js'
import '../../../node_modules/codemirror/addon/lint/lint.css'
import '../../../node_modules/codemirror/mode/javascript/javascript'
import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../../node_modules/codemirror/theme/duotone-light.css';
import  './BasicProfile.less';

window.JSHINT = JSHINT;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.models.list,
}))

export default class TableList extends PureComponent {
  constructor() {
    super();
    this.state = {
      code: '',
      value: '',
    };
  }

  updateCode = (newCode) => {
    const {dispatch} = this.props;
    console.log(newCode);
    try {
      const data = JSON.parse(newCode);
      dispatch({
        type: 'profile/fetch',
        payload: data,
      }).then(() => {
        let { profile: { list } } = this.props;
        this.setState({
          value: list.data,
        });
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  render() {
    const options = {
      mode: 'javascript',
	    gutters: ['CodeMirror-lint-markers'],
      theme: 'duotone-light',
      lint: true,
		};
    const frontendOptions = {
      mode: 'javascript',
	    gutters: ['CodeMirror-lint-markers'],
      theme: 'duotone-light',
      readOnly: true,
		};
    console.log(this.state.value);
    return (
      <PageHeaderLayout title="生成详情页">
        <Card bordered={false}>
          <Row gutter={8}>
            <Col span={12}>
              <CodeMirror value={this.state.code} onChange={this.updateCode} options={options}/>
            </Col>
            <Col span={12}>

              <CodeMirror value={this.state.value} options={frontendOptions}/>
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}

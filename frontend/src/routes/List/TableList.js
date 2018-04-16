import React, { PureComponent } from 'react';
import CodeMirror from 'react-codemirror'
import { JSHINT } from 'jshint'
import {
  Layout,
  Row,
  Col,
  Card,
  Form,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import '../../../node_modules/codemirror/addon/lint/json-lint.js'
import '../../../node_modules/codemirror/addon/lint/lint.js'
import '../../../node_modules/codemirror/addon/lint/javascript-lint.js'
import '../../../node_modules/codemirror/addon/lint/lint.css'
import '../../../node_modules/codemirror/mode/javascript/javascript'
import '../../../node_modules/codemirror/lib/codemirror.css';

window.JSHINT = JSHINT

export default class TableList extends PureComponent {
  constructor() {
    super();
    this.state = {
      code: '// Code',
    };
  }

  updateCode(newCode) {
		this.setState({
			code: newCode,
		});
	}
  render() {
    const options = {
      mode: 'javascript',
	    gutters: ['CodeMirror-lint-markers'],
      lint: true,
		};
    return (
      <PageHeaderLayout title="生成列表页">
        <Card bordered={false}>     
          <Row gutter={8}>
            <Col span={12}>          
              <CodeMirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
            </Col>
            <Col span={12}>
              <CodeMirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
            </Col>
          </Row> 
        </Card>
      </PageHeaderLayout>
    );
  }
}
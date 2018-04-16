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
import '../../../node_modules/codemirror/theme/material.css';

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
      lineNumbers: true,
      theme: 'material',
      lint: true,
		};
    return (
      <PageHeaderLayout title="生成列表页">
        <Card bordered={false}>      
          <CodeMirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
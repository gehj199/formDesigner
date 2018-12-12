/*
* 设计状态下的表格控件
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {extend} from '../../utils';
//import {button} from '../../lang';

import Datagrid from './common/datagrid';
var button=formLang.button;
const toolbarBtn = [
  {type: 'add', text: button.add},
  {type: 'edit', text: button.edit},
  {type: 'remove', text: button.remove},
  {type: 'compute', text: button.compute},
];

const FormDatagrid = (props) => {
  let {label, columns, ...others} = props;
  let copy;
  columns = columns.map((col) => {
    copy = Object.assign({}, col);
    copy.label = col.label.value;
    return copy;
  });
	return (
    <Datagrid {...others}
      label={label.value}
      columns={columns}
      toolbarBtn={toolbarBtn}
      readOnly={true}
      listenWindowResize={true}
      resizeNow={false}
      recomputeWidthEverytime={true}
			>
		</Datagrid>
	);
}
export default FormDatagrid;

/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';

class FormInput extends React.Component {

  triggerChange = changedValue => {
    // 这个 onChange 是表单项组件提供的，用于收集值
    this.props.onChange(changedValue);
  }

  handleChange = e => {
    this.triggerChange(e.target.value);
  }

  render() {
    const { value, placeholder } = this.props;

    return (
      <Input placeholder={placeholder} value={value} onChange={this.handleChange} />
    );
  }

}

function mapStateToProps({ Global }) {
  return {
    collapsed: Global.collapsed
  };
}

export default connect(mapStateToProps)(FormInput);

/* 开源-组件 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Cascader } from 'antd';
/* 自研-工具 */
import { mapifyCascader } from '@/utilities/format/cascader';
/* 状态管理 */
import { store } from 'dva';
/* 变量 */
const { dispatch } = store;

/* 外部值转内部值 */
function handleInternalValue(value, areas) {
  if (areas === undefined) {
    return;
  }

  const map = mapifyCascader(areas, {});
  const item = map[value];

  if (item && item.path) {
    const stringArr = item.path.split('|');
    const numberArr = stringArr.map(item => Number(item));
    return numberArr;
  }
}

class FormArea extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      internalValue: handleInternalValue(props.value, props.pagedata.areas),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { value, pagedata } = props;
    const internalValue = handleInternalValue(value, pagedata.areas);

    // 有条件的请求
    if (value !== state.value && value && internalValue === undefined) {
      dispatch({ type: 'Area/rReverseArea', payload: { id: value } });
    }

    return {
      value,
      internalValue,
    };
  }

  triggerChange = changedValue => {
    // 这个 onChange 是表单项组件提供的，用于收集值
    this.props.onChange(changedValue);
  }

  handleChange = (value) => {
    // 目标选项
    const targetValue = value[value.length - 1];
    // 触发变化
    this.triggerChange(targetValue);
    // 即刻改变，防止派生的时候多次更新
    this.setState({
      value: targetValue,
      internalValue: handleInternalValue(targetValue, this.props.pagedata.areas),
    });
    // 提示：
    // this.triggerChange 和 this.setState 单独执行后，都会触发 getDerivedStateFromProps 方法
    // 但是连续调用时，只会调用一次 getDerivedStateFromProps 方法，能够防止派生的时候多次更新
  }

  handleLoadData = selectedOptions => {
    // 目标选项
    const targetOption = selectedOptions[selectedOptions.length - 1];

    // 开始转圈
    targetOption.loading = true;

    // 加载数据
    dispatch({ type: 'Area/rGetAllArea', payload: { parentid: targetOption.value, pagesize: 10000 }, complete });

    // 加载完成
    function complete() {
      // 停止转圈
      targetOption.loading = false;
    }
  }

  handlePopup = value => {
    if (value && this.props.pagedata.areas === undefined) {
      dispatch({ type: 'Area/rGetAllArea', payload: { parentid: 1, pagesize: 10000 } });
    }
  }

  render() {
    const { state, props } = this;
    const { internalValue } = state;
    const { placeholder, pagedata } = props;
    const { areas } = pagedata;

    return (
      <Cascader
        placeholder={placeholder}
        value={internalValue}
        options={areas}
        loadData={this.handleLoadData}
        onChange={this.handleChange}
        onPopupVisibleChange={this.handlePopup}
        changeOnSelect
      />
    );
  }

}

function mapStateToProps(state) {
  return { pagedata: Object.assign({ ...state['Area'] })};
}

export default connect(mapStateToProps)(FormArea);

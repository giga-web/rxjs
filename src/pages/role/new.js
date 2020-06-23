/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
/* 自研-组件 */
import FormLayout from '@/layouts/FormLayout';
/* 数据 */
import { store, addAsyncModel } from 'dva';
import { New } from './model';
addAsyncModel(New);
/* 变量(方便使用) */
const { namespace } = New;
const { dispatch } = store;

class NewPage extends React.Component {

  componentDidMount() {
    this.reload();
  }

  reload(params) {
    this.reloadParams = { ...this.reloadParams, ...params };
    this.initData();
  }

  initData() {
    dispatch({ type: namespace + '/rMain', payload: this.reloadParams });
  }

  handleSubmit(success, values) {
    dispatch({ type: namespace + '/rPost', payload: values, success });
  }

  render() {
    const { config = {}, loading } = this.props.pagedata;

    return (
      <FormLayout fileds={config.form} loading={loading.rPost} handleSubmit={this.handleSubmit.bind(this)}></FormLayout>
    );
  }

}

function mapStateToProps(state) {
  return { pagedata: Object.assign({ ...state[namespace] }, { loading: {
    rMain: state.loading.effects[namespace + '/' + 'rMain'],
    rPost: state.loading.effects[namespace + '/' + 'rPost'],
  }})};
}

export default connect(mapStateToProps)(NewPage);

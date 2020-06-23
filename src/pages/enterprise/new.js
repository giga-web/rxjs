/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
/* 自研-组件 */
import FormLayout from '@/layouts/FormLayout';
/* 开源-工具 */
import qs from 'qs';
/* 数据 */
import { store, addAsyncModel } from 'dva';
import { New } from './model';
addAsyncModel(New);
/* 变量(方便使用) */
const { namespace } = New;
const { dispatch } = store;

class NewPage extends React.Component {

  componentDidMount() {
    this.urlParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    this.reload();
  }

  componentWillUnmount () {
    dispatch({ type: namespace + '/clean' });
  }

  reload(params) {
    if (!this.urlParams.id) {
      dispatch({ type: namespace + '/rMain' });
    } else {
      dispatch({ type: namespace + '/rGet', payload: {id: this.urlParams.id} });
    }
  }

  handleSubmit(success, values) {
    values.areaId = 1;
    if (this.urlParams.id) {
      dispatch({ type: namespace + '/rPut', payload: {id: this.urlParams.id, data: values}, success });
    } else {
      dispatch({ type: namespace + '/rPost', payload: values, success });}
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
    rGet: state.loading.effects[namespace + '/' + 'rGet'],
  }})};
}

export default connect(mapStateToProps)(NewPage);

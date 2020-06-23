/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
/* 自研-组件 */
import ListLayout from '@/layouts/ListLayout';
import ListFormLayout from '@/layouts/ListLayout/form.js';
import ListTableLayout from '@/layouts/ListLayout/table.js';
import ListActionsLayout from '@/layouts/ListLayout/actions.js';
import { Confirm, LinkButton } from '@/components/Common';
/* 数据 */
import { store, addAsyncModel } from 'dva';
import { List } from './model';
addAsyncModel(List);
/* 变量(方便使用) */
const { namespace } = List;
const { dispatch } = store;

class ListPage extends React.Component {

  componentDidMount() {
    this.reload();
  }
  componentWillUnmount () {
    dispatch({ type: namespace + '/clean' });
  }
  reload(params) {
    this.reloadParams = { ...this.reloadParams, ...params, pagesize: 5 };
    this.initData();
  }

  initData() {
    dispatch({ type: namespace + '/rMain', payload: this.reloadParams });
  }
  // 确认删除
  handleClick(id) {
    dispatch({ type: namespace + '/rDelete', payload: {id}, success: () => {
      this.initData();
    }});
  }
  render() {
    const { config = {}, mainData, loading } = this.props.pagedata;
    /* 操作 */
    const actions = {
      title: '操作',
      dataIndex: '',
      render: (text, record) => (
        <ListActionsLayout
          actions={[
            <Link key="view" to={'/enterprise/view?id=' + record.id}>详情</Link>,
            <Confirm handleClick={() => this.handleClick(record.id)}>删除企业</Confirm>
          ]}
        />
      )
    };

    return (
      <ListLayout title={config.title}>
        <ListFormLayout fileds={config.form} reload={this.reload.bind(this)} />
        <ListTableLayout fileds={[ ...(config.table || []), actions ]} data={mainData} loading={loading.rMain} reload={this.reload.bind(this)}>
          <LinkButton to={'/enterprise/new'} type={'primary'} >新建</LinkButton>
        </ListTableLayout>
      </ListLayout>
    );
  }

}

function mapStateToProps(state) {
  return { pagedata: Object.assign({ ...state[namespace] }, { loading: {
    rMain: state.loading.effects[namespace + '/' + 'rMain'],
    rDelete: state.loading.effects[namespace + '/' + 'rDelete'],
  }})};
}

export default connect(mapStateToProps)(ListPage);

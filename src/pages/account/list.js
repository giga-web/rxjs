/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
/* 自研-组件 */
import ListLayout from '@/layouts/ListLayout';
import ListFormLayout from '@/layouts/ListLayout/form.js';
import ListTableLayout from '@/layouts/ListLayout/table.js';
import ListActionsLayout from '@/layouts/ListLayout/actions.js';
import { LinkButton, Confirm } from '@/components/Common'
/* 数据 */
import { store, addAsyncModel } from 'dva';
import { accountList } from './model';

addAsyncModel(accountList);
/* 变量(方便使用) */
const { namespace } = accountList;
const { dispatch } = store;
class ListPage extends React.Component {
    componentDidMount() {
        this.reload();
    }

    reload(params) {
      this.reloadParams = { ...this.reloadParams, ...params, pagesize: 5 };
      this.initData();
    }
    initData() {
        dispatch({ type: namespace + '/rMain', payload: this.reloadParams });
    }
    // 确认设置角色
  handleSetup(id) {
  }
  // 确认删除
  handleDel(id) {
    dispatch({ type: namespace + '/rDelete', payload: {id},success: (res) => {
      this.initData();
    }});
  }
    render() {
       const { config = {}, listData, loading } = this.props.pagedata;
        /* 操作 */
        const actions = {
            title: '操作',
            dataIndex: '',
            render: (text, record) => (
                <ListActionsLayout
                    actions={[
                      // <Confirm title={'是否设置角色?'} handleClick={() => this.handleSetup(record.id)}>设置角色</Confirm>,
                      <Link key="edit" to={'/account/new?id=' + record.id}>编辑</Link>,
                      <Confirm  handleClick={() => this.handleDel(record.id)}>删除</Confirm>
                    ]}
                />
            )
        };

        return (
            <ListLayout title={config.title}>
                <ListFormLayout fileds={config.form} reload={this.reload.bind(this)} />
              <ListTableLayout fileds={[ ...(config.table || []), actions ]} data={listData} loading={loading.rMain} reload={this.reload.bind(this)} >
                <LinkButton to={'/account/new'} type={'primary'} >添加子账号</LinkButton>
              </ListTableLayout>
            </ListLayout>
        );
    }
}
function mapStateToProps(state) {
  return { pagedata: Object.assign({ ...state[namespace] }, { loading: {
    rMain: state.loading.effects[namespace + '/' + 'rMain'],
  }})};
}

export default connect(mapStateToProps)(ListPage);
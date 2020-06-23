/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
/* 自研-组件 */
import ListLayout from '@/layouts/ListLayout';
import ListFormLayout from '@/layouts/ListLayout/form.js';
import ListTableLayout from '@/layouts/ListLayout/table.js';
import ListActionsLayout from '@/layouts/ListLayout/actions.js';
import EnterpriseModal from './components/enterpriseModal'
/* 数据 */
import { store, addAsyncModel } from 'dva';
import { userList } from './model';

addAsyncModel(userList);
/* 变量(方便使用) */
const { namespace } = userList;
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
    render() {
       const { config = {}, mainData, loading } = this.props.pagedata;
        /* 操作 */
        const actions = {
            title: '操作',
            dataIndex: '',
            render: (text, record) => (
                <ListActionsLayout
                    actions={[
                        <EnterpriseModal id={record.id} />
                    ]}
                />
            )
        };

        return (
            <ListLayout title={config.title}>
                <ListFormLayout fileds={config.form} reload={this.reload.bind(this)} />
                <ListTableLayout fileds={[ ...(config.table || []), actions ]} data={mainData} loading={loading.rMain} reload={this.reload.bind(this)} />
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
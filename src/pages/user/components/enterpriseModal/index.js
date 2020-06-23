/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
/* 自研-组件 */
import ListTableLayout from '@/layouts/ListLayout/table.js';
/* 自研-样式 */
import styles from './index.m.less';
/* 数据 */
import { store, addAsyncModel } from 'dva';
import { enterpriseList } from './model';

addAsyncModel(enterpriseList);
/* 变量(方便使用) */
const { namespace } = enterpriseList;
const { dispatch } = store;
class enterpriseModal extends React.Component {
  state = {
    visible: false
  }
  componentDidMount() {
  }

  reload(params) {
    const { id } = this.props;
    this.reloadParams = { userid: id };
    this.initData();
  }
  initData() {
    dispatch({ type: namespace + '/rMain', payload: this.reloadParams });
  }
  handleCom = (visible) => {
    if (visible) this.reload();
    this.setState({
      visible
    });
  }
  render() {
    const { config = {}, listData, loading } = this.props.pagedata;
    const { visible } = this.state;
    return (
      <div>
        <div className={styles.color} onClick={() => this.handleCom(true)}>查看加入的企业</div>
        <Modal
          title="加入企业的列表"
          width={750}
          visible={visible}
          okText={'关闭'}
          keyboard={true}
          onOk={() => this.handleCom(false)}
          onCancel={() => this.handleCom(false)}
        >
          <ListTableLayout fileds={[ ...(config.table || []) ]} data={listData} loading={loading.rMain} reload={this.reload.bind(this)} />
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { pagedata: Object.assign({ ...state[namespace] }, { loading: {
        rMain: state.loading.effects[namespace + '/' + 'rMain'],
      }})};
}

export default connect(mapStateToProps)(enterpriseModal);
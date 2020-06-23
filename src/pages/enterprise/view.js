/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'antd';
/* 开源-工具 */
import qs from 'qs';
/* 自研-组件 */
import ViewLayout from '@/layouts/ViewLayout';
import ListTableLayout from '@/layouts/ListLayout/table.js';
import { LinkButton } from '@/components/Common';
import { EditManModal, EditVersionRelModal } from './components';
/* 自研-样式 */
import styles from './index.m.less';
/* 数据 */
import { store, addAsyncModel } from 'dva';
import { View } from './model';
addAsyncModel(View);
/* 变量(方便使用) */
const { namespace } = View;
const { dispatch } = store;

class ViewPage extends React.Component {
  state = {
    urlParams: {}
  }
  componentDidMount() {
    let urlParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    this.setState({
      urlParams
    });
    this.reload(urlParams);
  }

  reload(params) {
    this.reloadParams = { ...this.reloadParams, ...params };
    this.initData();
  }

  initData() {
    dispatch({ type: namespace + '/rMain', payload: this.reloadParams });
  }
  handleMan(values) {
    this.initData();
  }
  handleVersionRel(values) {
    this.initData();
  }
  render() {
    const { config = {}, mainData = {}, loading, listData } = this.props.pagedata;
    const { mainManager = {}, enterpriseVersionRel } = mainData;
    const { urlParams } = this.state;
    return (
      <div>
        <ViewLayout title={config.title} fileds={config.view} data={mainData.enterprise} loading={loading.rMain}>
          <LinkButton to={'/enterprise/new?id=' + urlParams.id} type={'primary'} >编辑</LinkButton>
          </ViewLayout>
        <div className={styles['view-warpper']}>
          <div className={styles['view-item']}>
            <div className={styles['view-title']}>
              <div>付费订阅</div>
              <div>
                <EditVersionRelModal enterpriseVersionRel={enterpriseVersionRel} handleSubmit={this.handleVersionRel.bind(this)} />
              </div>
            </div>
            <div className={styles['view-content']}>
              <Row>
                <Col span={8}>
                  <div className={styles['view-filed']}>
                    <span className={styles['content-label']}>版本：</span>
                    <span className={styles['content-value']}>{enterpriseVersionRel ? enterpriseVersionRel.name : ''}</span>
                  </div>

                </Col>
                <Col span={8}>
                  <div className={styles['view-filed']}>
                    <span className={styles['content-label']}>有效期截止日：</span>
                    <span className={styles['content-value']}>{enterpriseVersionRel ? enterpriseVersionRel.validity : ''}</span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className={styles['view-item']}>
            <div className={styles['view-title']}>
              <div>主管理员</div>
              <div>
                <EditManModal mainManager={mainManager} id={urlParams.id}  handleSubmit={this.handleMan.bind(this)} />
              </div>
            </div>
            <div className={styles['view-content']}>
              <Row>
                <Col span={8}>
                  <div className={styles['view-filed']}>
                    <span className={styles['content-label']}>用户名：</span>
                    <span className={styles['content-value']}>{mainManager ? mainManager.trueName : ''}</span>
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles['view-filed']}>
                    <span className={styles['content-label']}>手机号：</span>
                    <span className={styles['content-value']}>{mainManager ? mainManager.phone : ''}</span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className={styles['view-item']}>
            <div className={styles['view-title']}>
              <div>管理员</div>
            </div>
            <ListTableLayout fileds={[ ...(config.table || []) ]} data={listData} loading={loading.rMain} reload={this.reload.bind(this)} />
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { pagedata: Object.assign({ ...state[namespace] }, { loading: {
    rMain: state.loading.effects[namespace + '/' + 'rMain'],
  }})};
}

export default connect(mapStateToProps)(ViewPage);

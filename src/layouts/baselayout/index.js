/* 开源-组件 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
/* 自研-工具 */
import { handlePageTitle } from '@/utilities/framework';
import { findFirstLeaf } from '@/utilities/menu';
/* 自研-组件 */
import BaseLayoutMenu from './menu';
import BaseLayoutHeader from './header';
/* 状态管理 */
import { store, history } from 'dva';
/* 自研-样式 */
import styles from './index.m.less';
/* 变量 */
const { dispatch } = store;

class BaseLayout extends React.Component {

  constructor(props) {
    super(props);

    this.initData();
  }

  initData() {
    // 设置登录中
    window.logining = true;
    
    // 入口请求
    dispatch({ type: 'Global/rEntry', success: entrySuccess, fail: entryFail, complete: entryComplete });

    // 成功
    function entrySuccess(entryData) {
      // 进入默认页面
      if (history.location.pathname === '/') {
        const { originMenu } = entryData;

        // 查找-第一个叶子节点
        const leaf = findFirstLeaf(originMenu.tree);

        // 进入-第一个叶子节点
        if (leaf) {
          history.push(leaf.origin.url);
        }
      }
    }

    // 失败
    function entryFail() {}

    // 完成
    function entryComplete() {
      // 设置登录完成
      window.logining = false;

      // 重新发起所有等待的请求
      window.loginingWait.forEach(item => {
        item[0]();
      });
      window.loginingWait = [];
    }
  }

  render() {
    const { children, location } = this.props;

    return (
      <Fragment>

        <Helmet>
          <title>{handlePageTitle(location.pathname)}</title>
        </Helmet>

        <div className={styles['base-layout']}>

          <BaseLayoutHeader />

          <div className={styles['base-layout-content']}>

            <BaseLayoutMenu />

            <div className={styles['base-layout-children']}>
              {children}
            </div>

          </div>
        
        </div>

      </Fragment>
    );
  }

}

function mapStateToProps(state) {
  return { pagedata: Object.assign({ ...state['Global'] })};
}

export default connect(mapStateToProps)(BaseLayout);

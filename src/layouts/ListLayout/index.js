/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
/* 自研-样式 */
import styles from './index.m.less';
/* 自研 */
import { history } from 'dva';
class ListLayout extends React.Component {
  handleGoback() {
    history.goBack();
  }
  render() {
    const { title } = this.props;

    return (
      <div className={styles['list-layout']}>
        <div className={styles['list-layout-head']}>
          <div className={styles['list-layout-head-back']} onClick={this.handleGoback}>返回</div>
          <div className={styles['list-layout-head-slash']}>/</div>
          <div className={styles['list-layout-head-title']}>{title}</div>
        </div>
        <div className={styles['list-layout-body']}>{this.props.children}</div>
      </div>
    );
  }

}

function mapStateToProps({ Global }) {
  return {
    collapsed: Global.collapsed
  };
}

export default connect(mapStateToProps)(ListLayout);

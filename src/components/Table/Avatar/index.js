/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
/* 自研-样式 */
import styles from './index.m.less';
class TableAvatar extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <div><img src={text} className={styles.avatar}/></div>
    );
  }

}

function mapStateToProps({ Global }) {
  return {
    collapsed: Global.collapsed
  };
}

export default connect(mapStateToProps)(TableAvatar);

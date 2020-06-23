/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
/* 自研-样式 */
import styles from './index.m.less';

class ViewText extends React.Component {

  render() {
    const { value } = this.props;

    return (
      <div className={styles.text}>{value}</div>
    );
  }

}

function mapStateToProps({ Global }) {
  return {
    collapsed: Global.collapsed
  };
}

export default connect(mapStateToProps)(ViewText);

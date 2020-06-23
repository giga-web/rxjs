/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
/* 自研-样式 */
import styles from './actions.m.less';

class ListActionsLayout extends React.Component {

  render() {
    const { actions = [] } = this.props;

    return (
      <div className={styles['list-actions-layout']}>
        <ul className={styles['list-actions-list']}>
          {actions.map((item, index) => <li key={index} className={styles['list-actions-item']}>{item}</li>)}
        </ul>
      </div>
    );
  }

}

function mapStateToProps({ Global }) {
  return {
    collapsed: Global.collapsed
  };
}

export default connect(mapStateToProps)(ListActionsLayout);

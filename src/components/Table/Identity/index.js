/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';

class TableIdentity extends React.Component {
  filterIdentity() {
    const { text } = this.props;
    switch (text) {
      case '1' :
        return '主管理员';
      case '2':
        return  '管理员';
      case '3':
        return  '子账号';
      case '4':
        return  '普通用户';
      default:
        return '未知';
    }
  }
  render() {
    return (
      <div>{this.filterIdentity()}</div>
    );
  }

}

function mapStateToProps({ Global }) {
  return {
    collapsed: Global.collapsed
  };
}

export default connect(mapStateToProps)(TableIdentity);

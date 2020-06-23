/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';

class TableEnterpriseState extends React.Component {
  filterEnterpriseState() {
    const { text } = this.props;
    switch (text) {
      case 1 :
        return '启用';
      case 2:
        return  '禁用';
      default:
        return '未知';
    }
  }
  render() {
    return (
      <div>{this.filterEnterpriseState()}</div>
    );
  }

}

function mapStateToProps({ Global }) {
  return {
    collapsed: Global.collapsed
  };
}

export default connect(mapStateToProps)(TableEnterpriseState);

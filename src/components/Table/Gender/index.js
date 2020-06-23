/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';

class TableGender extends React.Component {
  filterGender() {
    const { text } = this.props;
    switch (text) {
      case 1 :
        return '男';
      case 2:
        return  '女';
      default:
        return '未知';
    }
  }
  render() {
    return (
      <div>{this.filterGender()}</div>
    );
  }

}

function mapStateToProps({ Global }) {
  return {
    collapsed: Global.collapsed
  };
}

export default connect(mapStateToProps)(TableGender);

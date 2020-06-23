/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';

class TableText extends React.Component {

  render() {
    return (
      <div>123</div>
    );
  }

}

function mapStateToProps({ Global }) {
  return {
    collapsed: Global.collapsed
  };
}

export default connect(mapStateToProps)(TableText);

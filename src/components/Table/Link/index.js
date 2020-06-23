/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class TableLink extends React.Component {

  render() {
    const { text, record } = this.props;

    return (
      <Link to={record.link}>{text}</Link>
    );
  }

}

function mapStateToProps({ Global }) {
  return {
    collapsed: Global.collapsed
  };
}

export default connect(mapStateToProps)(TableLink);

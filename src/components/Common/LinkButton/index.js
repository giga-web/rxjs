/* 点击跳转按钮 */
import React from 'react';
import { Button } from 'antd';
/* 自研-组件 */
import { history } from 'dva';
class LinkButton extends React.Component {
  handleJump = () => {
    const { to } = this.props;
    history.push(to);
  }
  render() {
    return (
      <Button {...this.props} onClick={this.handleJump}>{this.props.children}</Button>
    );
  }

}

export default LinkButton;
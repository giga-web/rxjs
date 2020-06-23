/* 点击跳转按钮 */
import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
/* 自研-样式 */
import styles from './index.m.less';

class Confirm extends React.Component {
  handleDel = () => {
     const {handleClick, title} = this.props;
    confirm({
      title: title || '是否删除？',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        handleClick();
      },
    });
  }
  render() {
    return (
      <span className={styles.color} onClick={this.handleDel}>{this.props.children}</span>
    );
  }

}

export default Confirm;
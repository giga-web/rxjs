/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Avatar } from 'antd';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
/* 自研-工具 */
import { clearToken } from '@/utilities/storage';
/* 自研-图片 */
import IMAGE_LOGOS_HEADER from '@/asserts/logos/header.png';
/* 自研-样式 */
import styles from './header.m.less';

/* 用户下拉 */
/*
<Menu.Item icon={<UserOutlined />}>
  个人中心
</Menu.Item>
<Menu.Item icon={<SettingOutlined />}>
  个人设置
</Menu.Item>
<Menu.Divider />
*/

class BaseLayoutHeader extends React.Component {

  render() {
    const { user = {} } = this.props.pagedata;

    // 用户下拉
    const DropdownUser = (
      <Menu>
        <Menu.Item icon={<LogoutOutlined />} onClick={clearToken}>退出登录</Menu.Item>
      </Menu>
    );

    return (
      <div className={styles['base-layout-header']}>

        <img src={IMAGE_LOGOS_HEADER} alt="logo" className={styles['base-layout-header-logo']} />

        <div className={styles['base-layout-header-divider']}></div>

        <div className={styles['base-layout-header-nav']}></div>

        <Dropdown overlay={DropdownUser}>
          <div className={styles['base-layout-header-item']}>
            <Avatar className={styles['base-layout-header-user-avatar']} size={26} src={user.avatar} />
            <div className={styles['base-layout-header-user-name']}>{user.nickName}</div>
          </div>
        </Dropdown>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { pagedata: Object.assign({ ...state['Global'] })};
}

export default connect(mapStateToProps)(BaseLayoutHeader);

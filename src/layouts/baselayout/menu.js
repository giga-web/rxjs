/* 开源-工具 */
import classnames from 'classnames';
/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
/* 自研-工具 */
import { openFirstLeaf } from '@/utilities/menu';
/* 自研-样式 */
import styles from './menu.m.less';

// 字体图标
const Icon = createFromIconfontCN({
  scriptUrl: 'font/menu/iconfont.js',
});

// 生成一级菜单项
const genParentMenuItem = (tree) => {
  if (tree === undefined) { return null; }

  return tree.map(menu => (
    <Menu.Item key={menu.origin.id}>
      {menu.origin.icon && <Icon type={menu.origin.icon} />}
      {menu.origin.name}
    </Menu.Item>
  ));
}

// 生成二三级菜单项
const genChildrenMenuItem = (tree) => {
  if (tree === undefined) { return null; }

  return tree.map(menu => {

    if (menu.children && menu.children.length > 0) {
      const subMenuTitle = (
        <div>
          {menu.origin.icon && <Icon type={menu.origin.icon} />}
          <span>{menu.origin.name}</span>
        </div>
      );

      return (
        <Menu.SubMenu key={menu.origin.id} title={subMenuTitle}>
          {genChildrenMenuItem(menu.children)}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item key={menu.origin.id}>
        {menu.origin.icon && <Icon type={menu.origin.icon} />}
        {menu.origin.name}
      </Menu.Item>
    );

  });
}

class BaseLayoutMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedKeys: [],
      selectedChildrenKeys: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { selectedKeys } = props.pagedata;
    
    if (selectedKeys) {
      return {
        selectedKeys: selectedKeys,
        selectedChildrenKeys: selectedKeys,
      };     
    }

    // 默认不更新
    return null;
  }

  handleMenuClick({ key }) {
    // 打开第一个叶子
    openFirstLeaf(this.props.pagedata.originMenu, key);
  }

  render() {
    const { selectedKeys, selectedChildrenKeys } = this.state;
    const { sideMenu = [], sideChildrenMenu = [] } = this.props.pagedata;

    return (
      <div className={styles['base-layout-menu']}>

        <div className={classnames(styles['base-layout-menu-parent'], sideMenu.length === 0 && styles['base-layout-menu-parent-none'])}>
          <Menu mode="inline" theme="dark" inlineIndent={12} selectedKeys={selectedKeys} onClick={this.handleMenuClick.bind(this)}>
            {genParentMenuItem(sideMenu)}
          </Menu>
        </div>
        
        <div className={classnames(styles['base-layout-menu-children'], sideChildrenMenu.length === 0 && styles['base-layout-menu-children-none'])}>
          <Menu mode="inline" theme="light" inlineIndent={0} selectedKeys={selectedChildrenKeys} onClick={this.handleMenuClick.bind(this)}>
            {genChildrenMenuItem(sideChildrenMenu)}
          </Menu>
        </div>

      </div>
    );
  }

}

function mapStateToProps(state) {
  return { pagedata: Object.assign({ ...state['Global'] })};
}

export default connect(mapStateToProps)(BaseLayoutMenu);

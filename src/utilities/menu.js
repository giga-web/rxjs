/* 开源-组件 */
import { message } from 'antd';
/* 状态管理 */
import { history } from 'dva';
/* 自研-工具 */
import { routeMap } from '@/router/routes';

export function genMenuData(originMenu, pathname) {
  // 默认返回值
  const defaultValue = {
    headMenu: [],
    sideMenu: [],
    sideChildrenMenu: [],
    selectedKeys: [],
  };

  if (originMenu === undefined) {
    return defaultValue;
  }

  // 一级菜单
  defaultValue.headMenu = originMenu.tree;

  // 菜单路由映射
  const pathnameMapping = originMenu.sourceMapping;

  // 匹配的路由
  const matchRoute = routeMap[pathname];

  // 菜单地址
  const menuUrl = matchRoute.menu || matchRoute.url;

  // 匹配的菜单
  const matchMenu = pathnameMapping[menuUrl];

  // 找不到
  if (matchMenu === undefined) {
    return defaultValue;
  }

  // 菜单树路径
  const { treePath } = matchMenu;

  // 菜单树路径数组
  const treePathArr = treePath.split('|');

  // 选中项
  defaultValue.selectedKeys = treePathArr;

  if (treePathArr.length > 1) {
    // 菜单主键映射
    const mapping = originMenu.mapping;

    // 一级菜单ID，用于获取二级菜单
    const oneLevelId = treePathArr[0];

    // 二级菜单
    defaultValue.sideMenu = mapping[oneLevelId].children;

    if (treePathArr.length > 2) {
      // 二级级菜单ID，用于获取三级菜单
      const twoLevelId = treePathArr[1];

      // 三级菜单
      defaultValue.sideChildrenMenu = mapping[twoLevelId].children;
    }
  }

  return defaultValue;
}

export function openFirstLeaf(originMenu, key) {
  // 数据不存在，返回
  if (originMenu === undefined) {
    return;
  }

  // 菜单映射
  const { mapping } = originMenu;

  // 匹配的菜单
  const matchMenu = mapping[key];

  // 第一个叶子节点
  const leaf = findFirstLeaf(matchMenu);

  // 地址
  const url = leaf.origin.url;

  // 无地址，提示用户
  if (url === undefined) {
    message.warning('菜单地址未设置');
    return;
  }

  // 外部链接
  if (checkExternalUrl(url)) {
    window.location.href = url;
  }

  // 内部路由
  history.push(url);
}

// 查找-第一个叶子
export function findFirstLeaf(menu) {
  // 数组模式
  if (Array.isArray(menu)) {
    return loop(menu);
  }

  // 没有子节点，返回
  if (menu.children === undefined) {
    return menu;
  }

  // 子节点模式
  return loop(menu.children);

  function loop(arr) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      if (item.children) {
        return loop(item.children);
      }

      return item;
    }
  }
}

// 检测-外部链接
function checkExternalUrl(url) {
  return new RegExp('http://').test(url);
}

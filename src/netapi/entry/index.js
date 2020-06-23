import rpcService from '@/netapi/rpcService';
import { formatParams } from '@/utilities/netapi';
import { tree, treenodeify } from '@/utilities/tree';
import { genMenuData } from '@/utilities/menu';
import { history } from 'dva';
import { ENV } from '@/constants/config';

const menu = [
  {
    id: 0,
    name: '虚拟',
  },
  {
    id: 1,
    parentId: 0,
    icon: 'menu-dashboard',
    name: '用户中心',
  },
  {
    id: 1001,
    parentId: 1,
    name: '企业管理',
    url: '/enterprise/list',
  },
  {
    id: 1002,
    parentId: 1,
    name: '用户管理',
    url: '/user/list',
  },
  {
    id: 2,
    parentId: 0,
    icon: 'menu-dashboard',
    name: '账号管理',
  },
  {
    id: 2001,
    parentId: 2,
    name: '子账号管理',
    url: '/account/list',
  },
  {
    id: 2002,
    parentId: 2,
    name: '角色管理',
    url: '/role/list',
  },
];

// console.log(tree(treenodeify(menu)));

// ====================================================
// 入口
export async function rEntry(params) {
  console.log('env', `${ENV.ICBP_AUUL}/saasplatform/userinfo`);
  // 开发： /k8sIcbpzuulApi/saasplatform/userinfo  => http://192.168.190.239:8093/saasplatform/userinfo
  // 开发： /demoIcbpzuulApi/saasplatform/userinfo  => http://demo:8093/saasplatform/userinfo
  // 发布： http://192.168.191.196:8082/icbp-zuul/bkd/saasplatform/userinfo
  // debugger;
  const [user] = await rpcService.rGet(ENV.ICBP_AUUL + '/saasplatform/userinfo' + formatParams({}, params, true));

  const originMenu = tree(treenodeify(menu));

  return [{ user, originMenu, ...genMenuData(originMenu, history.location.pathname) }];
}
// ====================================================

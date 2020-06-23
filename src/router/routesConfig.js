export default [
  { url: '/auth', name: '认证', redirect: '/auth/login/index', auth: false },
  { url: '/auth/login/index', name: '登录', auth: false },
  { url: '/dsb/workspace/index', name: '工作台' },
  { url: '/enterprise/list', name: '企业管理' },
  { url: '/enterprise/new', name: '新建企业', menu: '/enterprise/list' },
  { url: '/enterprise/view', name: '企业详情', menu: '/enterprise/list' },
  { url: '/user/list', name: '用户管理' },
  { url: '/account/list', name: '子账号管理' },
  { url: '/account/new', name: '新建子账号', menu: '/account/list' },
  { url: '/role/list', name: '角色管理' },
  { url: '/role/new', name: '新建角色', menu: '/role/list' },

  // 路径 / 的匹配规则太强大，应该放在最后面
  { url: '/', name: '首页' },
];

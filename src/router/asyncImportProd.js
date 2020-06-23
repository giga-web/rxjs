// 布局
// 基本
import(/* webpackChunkName: "layoutsbaselayout" */ '@/layouts/baselayout/index.js');
import(/* webpackChunkName: "layoutsauthlayout" */ '@/layouts/authlayout/index.js');

// 登录
import(/* webpackChunkName: "authloginindex" */ '@/pages/auth/login/index.js');

// 看板
// 工作台
import(/* webpackChunkName: "dsbworkspaceindex" */ '@/pages/dsb/workspace/index.js');

// 平台企业管理
// 列表
import(/* webpackChunkName: "enterpriselist" */ '@/pages/enterprise/list.js');
// 新建
import(/* webpackChunkName: "enterprisenew" */ '@/pages/enterprise/new.js');
// 查看
import(/* webpackChunkName: "enterpriseview" */ '@/pages/enterprise/view.js');

// 用户管理
// 列表
import(/* webpackChunkName: "userlist" */ '@/pages/user/list.js');

// 子账号管理
// 列表
import(/* webpackChunkName: "accountlist" */ '@/pages/account/list.js');
// 新建子账号
import(/* webpackChunkName: "accountnew" */ '@/pages/account/new.js');

// 角色管理
// 列表
import(/* webpackChunkName: "rolelist" */ '@/pages/role/list.js');
// 新增角色
import(/* webpackChunkName: "rolenew" */ '@/pages/role/new.js');

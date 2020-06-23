import rpcService from '@/netapi/rpcService';
import { formatParams } from '@/utilities/netapi';
import { ENV } from '@/constants/config';
// ====================================================
// 列表配置
export async function rConfigList() {
  return [
    {
      title: '用户管理',
      code: '/enterprise/list',
      api: {
        rConfig: '',
        rPagination: '',
        rReverse: '',
        rGetAll: '',
        rPost: '',
        rGet: '',
        rPut: '',
        rDelete: '',
      },
      form: [
        {
          type: 'FormInput',
          filed: 'account',
          label: '用户信息',
        },
      ],
      table: [
        {
          type: 'TableAvatar',
          title: '头像',
          dataIndex: 'avatar',
        },
        {
          title: '用户名',
          dataIndex: 'trueName',
        },
        {
          title: '注册时间',
          dataIndex: 'metaCreated',
        },
        {
          type: 'TableGender',
          title: '性别',
          dataIndex: 'gender',
        },
        {
          title: '手机号码',
          dataIndex: 'account',
        },
        {
          title: '邮箱',
          dataIndex: 'secEmail',
        },
        {
          title: '微信号',
          dataIndex: 'nickName',
        },
      ],
    },
  ];
}
// ====================================================

// ====================================================
// 分页
export async function rPagination(params) {
  return await rpcService.rGet(ENV.ICBP_AUUL + '/sec/users' + formatParams({}, params, true));
}
// ====================================================
// 详情
export async function rGet(params) {
  return await rpcService.rGet(ENV.ICBP_AUUL + '/saasplatform/enterprise/' + params.id);
}
// ====================================================

// ====================================================

// 新建
export async function rPost(params) {
  return await rpcService.rPost(ENV.ICBP_AUUL + '/saasplatform/enterprise', formatParams({}, params));
}
// ====================================================

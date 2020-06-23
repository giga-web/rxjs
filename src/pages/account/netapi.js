import rpcService from '@/netapi/rpcService';
import { formatParams } from '@/utilities/netapi';
import { ENV } from '@/constants/config';

// ====================================================
// 列表配置
export async function rConfigList() {
  return [
    {
      title: '子账号管理',
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
          filed: 'name',
          label: '姓名',
        },
      ],
      table: [
        {
          title: '姓名',
          dataIndex: 'trueName',
        },
        {
          title: '手机号',
          dataIndex: 'phone',
        },
        {
          title: '邮箱',
          dataIndex: 'secEmail',
        },
        {
          title: '备注',
          dataIndex: 'description',
        },
      ],
    },
  ];
}
// ====================================================

// ====================================================
// 新建子账号
export async function rConfigNew() {
  return [
    {
      code: '/enterprise/new',
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
          filed: 'trueName',
          label: '姓名',
          value: '',
        },
        {
          type: 'FormInput',
          filed: 'phone',
          label: '手机号',
          value: '',
        },
        {
          type: 'FormInput',
          filed: 'password',
          label: '密码',
          value: '',
        },
        {
          type: 'FormInput',
          filed: 'secEmail',
          label: '邮箱',
          value: '',
        },
        {
          type: 'FormInput',
          filed: 'description',
          label: '备注',
          value: '',
        },
      ],
    },
  ];
}
// ====================================================

// ====================================================
// 分页
export async function rPagination(params) {
  return await rpcService.rGet(ENV.ICBP_AUUL + '/saasplatform/user/query' + formatParams({}, params, true));
}
// ====================================================
// 根据id查询账号
export async function rGet(params) {
  return await rpcService.rGet(ENV.ICBP_AUUL + '/sec/user/platfrom/query/' + params.id);
}
// ====================================================

// ====================================================
// 删除
export async function rDelete(params) {
  return await rpcService.rDelete(ENV.ICBP_AUUL + '/saasplatform/user/delete/' + params.id);
}
// ====================================================

// ====================================================
// 新建
export async function rPost(params) {
  return await rpcService.rPost(ENV.ICBP_AUUL + '/saasplatform/user/add', formatParams({}, params));
}
// ====================================================

// ====================================================
// 修改
export async function rPut(params) {
  return await rpcService.rPut(ENV.ICBP_AUUL + '/saasplatform/user/edit/' + params.id, formatParams({}, params.data));
}
// ====================================================

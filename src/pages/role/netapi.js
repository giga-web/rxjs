import rpcService from '@/netapi/rpcService';
import { formatParams } from '@/utilities/netapi';
import { ENV } from '@/constants/config';
// ====================================================
// 列表配置
export async function rConfigList() {
  return [
    {
      title: '角色管理',
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
          label: '角色名称',
        },
      ],
      table: [
        {
          title: '角色名称',
          dataIndex: 'trueName',
        },
        {
          title: '编码',
          dataIndex: 'metaCreated',
        },
        {
          title: '描述',
          dataIndex: 'gender',
        },
        {
          title: '应用人数',
          dataIndex: 'account',
        },
      ],
    },
  ];
}
// ====================================================

// ====================================================
// 新建角色
export async function rConfigNew() {
  return [
    {
      title: '创建角色',
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
          filed: 'name',
          label: '角色名称',
          placeholder: '请输入角色名称',
          value: '',
        },
        {
          type: 'FormInput',
          filed: 'shortName',
          label: '描述',
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

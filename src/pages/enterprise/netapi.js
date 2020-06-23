import rpcService from '@/netapi/rpcService';
import { formatParams } from '@/utilities/netapi';
import { ENV } from '@/constants/config';
// ====================================================
// 列表配置
export async function rConfigList() {
  return [
    {
      title: '企业管理',
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
          label: '企业名称',
        },
        {
          type: 'FormInput',
          filed: 'code',
          label: '企业编码',
        },
        {
          type: 'FormArea',
          filed: 'region',
          label: '所属区域',
          placeholder: '请选择所属区域',
        },
      ],
      table: [
        {
          type: 'TableLink',
          title: '企业名称',
          dataIndex: 'name',
        },
        {
          title: '企业编码',
          dataIndex: 'code',
        },
        {
          title: '企业简称',
          dataIndex: 'shortName',
        },
        {
          title: '所属行业',
          dataIndex: 'industry',
        },
        {
          title: '联系人',
          dataIndex: 'contacts',
        },
        {
          title: '联系电话',
          dataIndex: 'contactNumber',
        },
        {
          title: '主管理员',
          dataIndex: 'mainManager',
        },
        {
          title: '所属区域',
          dataIndex: 'region',
        },
      ],
    },
  ];
}
// ====================================================

// ====================================================
// 分页
export async function rPagination(params) {
  return await rpcService.rGet(ENV.ICBP_AUUL + '/saasplatform/enterpriselist' + formatParams({}, params, true));
}
// ====================================================

// ====================================================
// 详情配置
export async function rConfigView() {
  return [
    {
      title: '企业详情',
      code: '/enterprise/view',
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
      view: [
        {
          filed: 'name',
          label: '公司名称',
        },
        {
          filed: 'region',
          label: '所属地区',
        },
        {
          filed: 'contacts',
          label: '联系人',
        },
        {
          filed: 'contactNumber',
          label: '联系电话',
        },
        {
          filed: 'shortName',
          label: '企业简称',
        },
        {
          filed: 'contactAddress',
          label: '联系地址',
        },
        {
          filed: 'scale',
          label: '企业规模',
        },
        {
          filed: 'updateBy',
          label: '创建人',
        },
        {
          filed: 'metaCreated',
          label: '创建时间',
        },
      ],
      table: [
        {
          title: '昵称',
          dataIndex: 'trueName',
        },
        {
          title: '手机号',
          dataIndex: 'phone',
        },
        {
          type: 'TableIdentity',
          title: '子账号身份',
          dataIndex: 'gender',
        },
        {
          title: '注册时间',
          dataIndex: 'registrationDate',
        },
      ],
    },
  ];
}
// ====================================================

// ====================================================
// 详情rGet
export async function rGet(params) {
  return await rpcService.rGet(ENV.ICBP_AUUL + '/saasplatform/enterprise/' + params.id);
}
// ====================================================

// ====================================================
// 新建配置
export async function rConfigNew() {
  return [
    {
      title: '创建企业',
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
          label: '企业名称',
          value: '',
        },
        {
          type: 'FormInput',
          filed: 'shortName',
          label: '企业简称',
          value: '',
        },
        {
          type: 'FormArea',
          filed: 'region',
          label: '所属地区',
          value: '',
        },
        {
          type: 'FormInput',
          filed: 'industry',
          label: '所属行业',
          value: '',
        },
        {
          type: 'FormInput',
          filed: 'contactNumber',
          label: '联系电话',
          value: '',
        },
        {
          type: 'FormInput',
          filed: 'contacts',
          label: '联系人',
          value: '',
        },
        {
          type: 'FormInput',
          filed: 'scale',
          label: '企业规模',
          value: '',
        },
        {
          type: 'FormInput',
          filed: 'description',
          label: '企业简介',
          value: '',
        },
        {
          type: 'FormInput',
          filed: 'contactAddress',
          label: '联系地址',
          value: '',
        },
      ],
    },
  ];
}
// ====================================================

// ====================================================
// 新建
export async function rPost(params) {
  return await rpcService.rPost(ENV.ICBP_AUUL + '/saasplatform/enterprise', formatParams({}, params));
}
// ====================================================

// 修改
export async function rPut(params) {
  return await rpcService.rPut(ENV.ICBP_AUUL + '/saasplatform/enterprise/' + params.id, formatParams({}, params.data));
}
// ====================================================

// 删除
export async function rDelete(params) {
  return await rpcService.rDelete(ENV.ICBP_AUUL + '/saasplatform/enterprise/' + params.id);
}
// ====================================================


// ====================================================

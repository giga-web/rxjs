import rpcService from '@/netapi/rpcService';
import { formatParams } from '@/utilities/netapi';
import { ENV } from '@/constants/config';
// ====================================================
// 列表配置
export async function rConfigList() {
  return [
    {
      table: [
        {
          title: '企业名称',
          dataIndex: 'name',
        },
        {
          title: '企业编码',
          dataIndex: 'code',
        },
        {
          type: 'TableIdentity',
          title: '身份',
          dataIndex: 'identity',
        },
        {
          type: 'TableEnterpriseState',
          title: '状态',
          dataIndex: 'state',
        },
      ],
    },
  ];
}
// ====================================================

// ====================================================
// 查看列表
export async function rPagination(params) {
  return await rpcService.rGet(ENV.ICBP_AUUL + '/saasplatform/user/queryUserEnt' + formatParams({}, params, true));
}

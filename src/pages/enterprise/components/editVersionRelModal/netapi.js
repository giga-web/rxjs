import rpcService from "@/netapi/rpcService";
import { formatParams } from "@/utilities/netapi";
import { ENV } from '@/constants/config';
// ====================================================
// 列表配置
export async function rConfigNew() {
  return [{
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
        filed: 'validity',
        label: '有效期截止日',
        value: ''
      },
    ],
  }];
}
// ====================================================


// ====================================================
// 编辑
export async function rPut(params) {
  return await rpcService.rPut(ENV.ICBP_AUUL + '/saasplatform/enterpriseVersionRel/' + params.id, formatParams({}, params.data));
}
// ====================================================


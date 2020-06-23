import rpcService from "@/netapi/rpcService";
import { formatParams } from "@/utilities/netapi";
import { ENV } from '@/constants/config';
// ====================================================
// 配置
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
        filed: 'trueName',
        label: '用户名',
        value: ''
      },
      {
        type: 'FormInput',
        filed: 'phone',
        label: '手机号',
        value: ''
      },
    ],
  }];
}
// ====================================================


// ====================================================
// 编辑
export async function rPut(params) {
  return await rpcService.rPost(ENV.ICBP_AUUL + '/saasplatform/editManager', formatParams({}, params));
}
// ====================================================


// 新增
export async function rPost(params) {
  return await rpcService.rPost(ENV.ICBP_AUUL + '/saasplatform/enterprise/addmainmanager/' + params.id, formatParams({}, params.data));
}
// ====================================================


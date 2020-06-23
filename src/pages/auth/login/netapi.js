import rpcService from '@/netapi/rpcService';
import { formatParams } from '@/utilities/netapi';
import { ENV } from '@/constants/config';
// ====================================================
// 登陆
export async function rLogin(params) {
  return await rpcService.rPut(ENV.ICBP_AUUL + '/saasplatform/login', formatParams({}, params));
}
// ====================================================

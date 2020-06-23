import rpcService from '@/netapi/rpcService';
import { formatParams } from '@/utilities/netapi';
import { ENV } from '@/constants/config';

// ====================================================
// 省市区
export async function rGetAllArea(params) {
  return await rpcService.rGet(ENV.ICBP_AUUL + '/ifs/adminareas-qt-1' + formatParams({}, params, true));
}
// ====================================================


// ====================================================
// 省市区-反查
export async function rReverseArea(params) {
  const [data] = await rpcService.rGet(ENV.ICBP_AUUL + '/ifs/adminareas-qt-3' + formatParams({}, params, true));

  // 过滤中国
  const filterData = data.filter(item => item.id !== 1);

  return [filterData];
}
// ====================================================

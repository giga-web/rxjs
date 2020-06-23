// ====================================================
import { ENV } from '@/constants/config';

const whiteList = [
  // 登录
  ENV.ICBP_AUUL + '/saasplatform/login',
];

// 检测 url 是否在白名单内
export function checkWhiteList(url) {
  const interfaceUrl = url.replace(/(.*?)\?(.*)/, '$1');
  return whiteList.includes(interfaceUrl);
}
// ====================================================

// ====================================================
const entryList = [
  // 用户信息
  ENV.ICBP_AUUL + '/saasplatform/userinfo',
];

// 检测 url 是否在入口请求内
export function checkEntryList(url) {
  const interfaceUrl = url.replace(/(.*?)\?(.*)/, '$1');
  return entryList.includes(interfaceUrl);
}

export default {};
// ====================================================

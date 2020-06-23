/* 常量 */
import { KEY_USER_SETTING } from '@/constants/frontend';
/* 数据 */
import { history } from 'dva';
/* 自研-工具 */
import { get } from '@/utilities/lodash';
import { routeMap } from '@/router/routes';

export function parse(value) {
  let res = null;

  try {
    res = JSON.parse(value);
  }
  catch(err) {
    console.log(err);
  }
  
  return res;
}

export function getToken() {
  const token = get(parse(localStorage.getItem(KEY_USER_SETTING)), 'token');

  if (token) {
    return token;
  }

  return false;
}

export function setToken(token) {
  localStorage.setItem(KEY_USER_SETTING, JSON.stringify({ token }));
}

export function clearToken() {
  localStorage.removeItem(KEY_USER_SETTING);
  history.push('/auth');
}

export function ensureLogin() {
  const { pathname } = history.location;
  const route = routeMap[pathname];

  if (getToken() === false && route.auth !== false) {
    history.push('/auth');
  }
}

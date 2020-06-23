/* 接口 */
import {rConfigList, rPagination, rGet, rConfigNew, rPost } from './netapi';
/* 自研 */

/* 命名空间(全局唯一) */
const namespacePrefix = 'enterpriseModal';

// ====================================================
// 列表
const ListState = {};

export const enterpriseList = {
  namespace: namespacePrefix + '/List',
  state: ListState,
  effects: {
    *rMain({ payload }, { call, put }) {
      const [config] = yield call(rConfigList, payload);

      const [mainData, error] = yield call(rPagination, payload);
      const listData = {
        entities: mainData
      }
      yield put({ type: 'save', payload: { config, listData, error } });
    },
  },
  reducers: {
    clean() {
      return ListState;
    },
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
// ====================================================

/* 接口 */
import {rConfigList, rPagination, rGet, rConfigNew, rPost } from './netapi';
/* 自研 */

/* 命名空间(全局唯一) */
const namespacePrefix = 'user';

// ====================================================
// 列表
const ListState = {};

export const userList = {
  namespace: namespacePrefix + '/List',
  state: ListState,
  effects: {
    *rMain({ payload }, { call, put }) {
      const [config] = yield call(rConfigList, payload);

      const [mainData, error] = yield call(rPagination, payload);

      // 特别处理
      if (mainData) {
        mainData.entities.map(item => {
          item.link = '/enterprise/view?id=' + item.id;
          return item;
        });
      }

      yield put({ type: 'save', payload: { config, mainData, error } });
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

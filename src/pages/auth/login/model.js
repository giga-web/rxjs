/* 接口 */
import { rLogin } from './netapi';

/* 命名空间(全局唯一) */
const namespacePrefix = '/auth/login';

// ====================================================
// 列表
const ListState = {};

export const List = {
  namespace: namespacePrefix + '/List',
  state: ListState,
  effects: {
    *rMain({ payload, success, fail }, { call }) {
      const [mainData, error] = yield call(rLogin, payload);

      if (error) {
        fail && fail(error);
      }

      if (mainData) {
        success && success(mainData);
      }
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

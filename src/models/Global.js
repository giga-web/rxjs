/* 接口 */
import { rEntry } from '@/netapi/entry';
/* 工具 */
import { genMenuData } from '@/utilities/menu';

/* 命名空间(全局唯一) */
const namespacePrefix = 'Global';

// ====================================================
// 全局
const GlobalState = {
  collapsed: true,
};

export const Global = {

  namespace: namespacePrefix,

  state: GlobalState,

  effects: {
    *rEntry({ success, fail, complete }, { call, put }) {
      const [entryData, error] = yield call(rEntry);

      if (error) {
        fail && fail();
        return;
      }

      if (entryData) {
        yield put({ type: 'save', payload: entryData });
        success && success(entryData);
      }

      complete && complete();
    },
  },

  reducers: {
    updateByHistoryChange(state, action) {
      return {
        ...state,
        ...genMenuData(state.originMenu, action.payload)
      };
    },
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(location => {
        dispatch({ type: 'updateByHistoryChange', payload: location.pathname })
      });
    },
  },

};
// ====================================================

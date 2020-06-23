/* 接口 */
import {rConfigList, rPagination, rGet, rConfigNew, rPost, rPut, rManPut } from './netapi';

/* 自研 */

/* 命名空间(全局唯一) */
const namespacePrefix = 'editManModal';

// ====================================================
// 列表
const ListState = {};

export const editMan = {
  namespace: namespacePrefix + '/List',
  state: ListState,
  effects: {
    *rMain({ payload }, { call, put }) {
      const [config] = yield call(rConfigNew, payload);
      yield put({ type: 'save', payload: { config } });
    },
    *rPut({ payload, success }, { call, put }) {
      const [mainData, error] = yield call(rPut, payload);
      success && success(mainData);
    },
    *rGet({ payload, success }, { call, put }) {
      let [config] = yield call(rConfigNew);
      config.form = config.form.map((item) => {
        item.value = payload[item.filed];
        return item;
      });
      yield put({ type: 'save', payload: { config } });
    },
    *rPost({ payload, success }, { call, put }) {
      const [mainData, error] = yield call(rPost, payload);
      success && success(mainData);
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

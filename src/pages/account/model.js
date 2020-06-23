/* 接口 */
import {rConfigList, rPagination, rGet, rConfigNew, rPost, rDelete, rPut } from './netapi';
/* 自研 */

/* 命名空间(全局唯一) */
const namespacePrefix = 'account';

// ====================================================
// 列表
const ListState = {};

export const accountList = {
  namespace: namespacePrefix + '/List',
  state: ListState,
  effects: {
    *rMain({ payload }, { call, put }) {
      const [config] = yield call(rConfigList, payload);

      const [mainData, error] = yield call(rPagination, payload);
      let listData = {
        entities: mainData
      }
      yield put({ type: 'save', payload: { config, listData, error } });
    },
    *rDelete({ payload, success }, { call, put }) {
      const [mainData, error] = yield call(rDelete, payload);
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


// ====================================================
// 新建
const NewState = {};

export const New = {
  namespace: namespacePrefix + '/New',
  state: NewState,
  effects: {
    *rMain({ payload }, { call, put }) {
      const [config] = yield call(rConfigNew, payload);
      yield put({ type: 'save', payload: { config } });
    },
    *rPost({ payload, success }, { call, put }) {
      const [mainData, error] = yield call(rPost, payload);
      success && success(mainData);
    },
    *rPut({ payload, success }, { call, put }) {
      const [mainData, error] = yield call(rPut, payload);
      success && success(mainData);
    },
    *rGet({ payload, success }, { call, put }) {
      let [config] = yield call(rConfigNew, payload);
      const [mainData, error] = yield call(rGet, payload);
      console.log(mainData, config, 'mainData')
      config.form = config.form.map((item) => {
        item.value = mainData[item.filed];
        return item;
      });
      yield put({ type: 'save', payload: { config } });
    },
  },
  reducers: {
    clean() {
      return NewState;
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
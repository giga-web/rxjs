/* 接口 */
import { rConfigList, rConfigView, rPagination, rGet, rConfigNew, rPost, rDelete, rPut } from './netapi';
/* 自研 */

/* 命名空间(全局唯一) */
const namespacePrefix = 'enterprise';

// ====================================================
// 列表
const ListState = {};

export const List = {
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
    *rGet({ payload, success }, { call, put }) {
      let [config] = yield call(rConfigNew, payload);
      const [mainData, error] = yield call(rGet, payload);
      config.form = config.form.map((item) => {
        item.value = mainData.enterprise[item.filed];
        return item;
      });
      yield put({ type: 'save', payload: { config } });
    },
    *rPut({ payload, success }, { call, put }) {
      const [mainData, error] = yield call(rPut, payload);

      success && success(mainData);
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


// ====================================================
// 查看
const ViewState = {};

export const View = {
  namespace: namespacePrefix + '/View',
  state: ViewState,
  effects: {
    *rMain({ payload }, { call, put }) {
      const [config] = yield call(rConfigView, payload);

      const [mainData, error] = yield call(rGet, payload);
      let listData = {
        entities: mainData.manager
      };
      yield put({ type: 'save', payload: { config, mainData, error, listData } });
    },
  },
  reducers: {
    clean() {
      return ViewState;
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

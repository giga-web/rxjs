/* 接口 */
import { rGetAllArea, rReverseArea } from '@/netapi/area';
/* 工具 */
import { formatCascader } from '@/utilities/format/cascader';

/* 命名空间(全局唯一) */
const namespacePrefix = 'Area';

// ====================================================
// 省市区
const AreaState = {};

export const Area = {

  namespace: namespacePrefix,

  state: AreaState,

  effects: {
    *rGetAllArea({ payload, complete }, { call, put, select }) {
      const [data] = yield call(rGetAllArea, payload);

      complete && complete();

      if (data === undefined) { return; }

      const { areas } = yield select(state => state[namespacePrefix]);

      yield put({
        type: 'save',
        payload: { areas: formatCascader({ exist: areas, origin: data.entities, parentId: payload.parentid }) }
      });
    },
    *rReverseArea({ payload }, { call, put, select }) {
      const [data] = yield call(rReverseArea, payload);

      if (data === undefined) { return; }

      const { areas } = yield select(state => state[namespacePrefix]);

      yield put({
        type: 'save',
        payload: { areas: formatCascader({ exist: areas, origin: data }) }
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

};
// ====================================================

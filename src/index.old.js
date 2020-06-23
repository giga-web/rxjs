/* TODO：按道理这是不需要的，目前只是为了能够让入口文件有异步加载的代码 */
import(/* webpackChunkName: "TempComponent" */ '@/components/TempComponent');

/* 开源-组件 */
import React from 'react';
import ReactDOM from 'react-dom';

/* 自研-组件 */
import App from '@/App';

/* 自研-工具 */
import { ensureLogin } from '@/utilities/storage';

/* 状态管理 */
import { addAsyncModel } from 'dva';
import { Global } from '@/models/Global';
import { Area } from '@/models/Area';
/* 初始状态 */
addAsyncModel(Global);
addAsyncModel(Area);

/* 确保登录 */
ensureLogin();

/* 是否登录中 */
window.logining = false;
/* 等待登录完成再发送的请求 */
window.loginingWait = [];

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

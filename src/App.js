/* 配置语言包 */
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';

/* 开源-组件 */
import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

/* 状态管理 */
import { store } from 'dva';

/* 自研-组件 */
import RouterWrapper from '@/router';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <RouterWrapper />
      </ConfigProvider>
    </Provider>
  );
}

export default App;

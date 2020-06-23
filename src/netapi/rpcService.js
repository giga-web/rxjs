/* 开源-工具 */
import qs from 'qs';
/* 开源-组件 */
import React from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
/* 自研-工具 */
import { getToken, setToken } from '@/utilities/storage';
import { checkWhiteList, checkEntryList } from './whiteList';
import { ENV } from '@/constants/config';
/**
 * 约定
 * 返回值始终是一个数组
 * 第一个元素返回的是完全正确的值，当有错误时，返回 undefined
 * 第二个元素返回的是页面需要提示的错误，这依赖后台返回 code > 0
 * 其他错误全局提示，并返回空数组
 */

// 错误对应的意思
const errorMap = {
  RequestCancel: '请求取消',

  LoginCancel: '登录取消',
  LoginError: '登录错误',

  NoToken: '令牌丢失',

  Timeout: '请求超时,请稍后再试',

  ResponseError: '返回值违反约定',

  UrlError: '地址错误',
  OtherError: '其他错误',
  ServerError: '服务错误',
  InvalidToken: '令牌无效',
};

// 错误时，伪造返回结果
function MockResponse(error) {
  // debugger;

  return {
    code: -999,
    message: error,
    data: errorMap[error] || '哎呀，你的网络好像出问题了',
  };
}

// 处理异常
function handleCatch(tag, options, error) {
  // debugger;

  if (error === 'NoToken' || error === 'InvalidToken') {
    // debugger;

    // 需要登录
    return loginModal(options);
  } else {
    // debugger;

    // 返回模拟响应
    notification.warning({ message: '通知提醒', description: MockResponse(error).data });
    return [];
  }
}

// 登录
function login(success, fail, values) {
  // return new Promise((resolve, reject) => {
  console.log(values);

  // 登录请求的参数
  const options = {
    url: ENV.ICBP_AUUL + '/saasplatform/login',
    method: 'PUT',
    header: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(values),
  };

  // 发送登录请求
  request(options)
    .then(res => {
      const [token, error] = res;

      if (error) {
        // 登录错误回调
        fail && fail(error);
      }

      if (token) {
        // 保存到本地存储
        setToken(token);

        // 登录成功回调
        success && success(token);
      }
    })
    .catch(error => {
      fail && fail(error);
    });

  // });
}

// 弹窗登录
function loginModal(options) {
  return new Promise((resolve, reject) => {
    // 登录组件
    // initialValue="18617122231"
    // initialValue="888888"
    const LoginComponet = (
      <Form onFinish={login.bind(null, success, fail)}>
        <Form.Item name="account" initialValue="18617122231" rules={[{ required: true, message: '请输入账号' }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
        </Form.Item>
        <Form.Item name="password" initialValue="888888" rules={[{ required: true, message: '请输入密码' }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
        </Form.Item>
        <div>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <Button onClick={cancel}>取消</Button>
        </div>
      </Form>
    );

    // 显示弹窗
    const modal = Modal.success({
      className: 'login-modal',
      centered: true,
      content: LoginComponet,
      icon: null,
    });

    // 登录成功回调
    function success(token) {
      // debugger;

      // 设置 token 以重新发起请求
      options.header['authorization'] = token;

      // 重新发起请求
      resolve(request(options));

      // 销毁弹窗
      modal.destroy();
    }

    // 登录报错回调
    function fail() {
      // debugger;

      reject('LoginError');

      // 销毁弹窗
      modal.destroy();
    }

    // 取消登录
    function cancel() {
      // debugger;

      // 拒绝登录，进入最后的 catch 块
      reject('LoginCancel');

      // 销毁弹窗
      modal.destroy();
    }
  });
}

// 请求封装
function request(options) {
  // debugger;
  return fetch(options.url, {
    // 必须和 header 的 'Content-Type' 匹配
    body: options.data,
    // *default, no-cache, reload, force-cache, only-if-cached
    cache: 'no-cache',
    // include, same-origin, *omit
    // credentials: 'include',
    headers: options.header,
    // *GET, POST, PUT, DELETE, etc.
    method: options.method,
    // no-cors, cors, *same-origin
    mode: 'cors',
    // manual, *follow, error
    redirect: 'follow',
    // *client, no-referrer
    referrer: 'no-referrer',
  })
    .then(response => {
      // debugger;

      if (response.ok === true) {
        // debugger;

        // 响应成功直接返回，不做统一提示
        // 可能的去处：
        // 1. 正常请求，直接返回到请求发起的地方
        // 2. 登录请求，去到发送登录请求的地方
        return response.json();
      } else if ([401, 403].includes(response.status)) {
        // debugger;

        throw 'InvalidToken';
      } else if ([404].includes(response.status)) {
        // debugger;
        throw 'UrlError';
      } else if ([500].includes(response.status)) {
        // debugger;
        throw 'ServerError';
      } else {
        // debugger;
        throw 'OtherError';
      }
    })
    .then(json => {
      try {
        // 完全正常
        if (json.code === 0) {
          return [json.data || true];
        }

        // 全局提示
        if (json.code < 0) {
          notification.warning({ message: '通知提醒', description: json.message });
          return [];
        }

        // 页面提示
        if (json.code > 0) {
          return [undefined, json];
        }
      } catch (error) {
        // debugger;
        throw 'ResponseError';
      }
    })
    .catch(error => {
      // debugger;

      // 这个 catch 存在的原因是，当网络错误或请求被阻止会直接进入这里。并且根据 error 的数据类型，统一返回字符串形式的错误

      if (typeof error === 'string') {
        // debugger;

        // 1. 接收上一个 then 的 throw 值，继续 throw
        throw error;
      } else {
        // debugger;

        // 2. 网络错误或请求被阻止，如跨域
        throw error.message;
      }
    });
}

// 请求入口
function requestEntry(options) {
  // debugger;

  // 拦截下一个请求，请求中，不在入口白名单内的请求不可以发起
  if (window.logining === true && checkEntryList(options.url) === false) {
    return loginingWaitPromise(options.url, () => requestEntry(options));
  }

  // 请求头
  const header = { ...options.header };

  // 默认请求内容类型
  header['Content-Type'] = header['Content-Type'] || 'application/json;charset=UTF-8';

  // 令牌
  let token = false;

  // 不包含在白名单中的请求
  if (checkWhiteList(options.url)) {
    token = true;
  } else {
    // 获取 token 值
    token = getToken();

    // 设置
    if (token) {
      header['authorization'] = token;
    }
  }

  // 设置登录中，马上就要登录了，可以起到拦截下一个请求的作用
  if (Boolean(token) === false) {
    window.logining = true;
  }

  // 最终请求参数
  options = { ...options, header };
  // debugger;
  return new Promise((resolve, reject) => {
    if (token) {
      // debugger;

      // 当有 token 时，直接发起请求，过程中可能会有 token 失效的问题，这种情况将根据请求的结果进行处理
      resolve(request(options));
    } else {
      // debugger;

      // 当无 token 时，进入 catch01 处，这也是 catch01 存在的原因
      reject('NoToken');
    }
  })
    .catch(handleCatch.bind(null, 'catch01', options))
    .catch(handleCatch.bind(null, 'catch02', options));
}

// 登录等待
function loginingWaitPromise(url, callback) {
  // debugger;

  // 登录中，只有入口白名单内的请求可以发起
  if (window.logining === true && checkEntryList(url) === false) {
    // debugger;

    // 其它请求添加到等待数组
    return new Promise((resolve, reject) => {
      // debugger;

      // 添加到等待数组
      window.loginingWait.push([resolve, reject]);
    })
      .then(() => {
        // debugger;

        // 登录后调用
        return callback();
      })
      .catch(() => [undefined, MockResponse('RequestCancel')]);
  }

  // 无需等待，直接调用
  return callback();
}

const rpcService = {
  rGet: (url, extend) => {
    // debugger;
    return loginingWaitPromise(url, () => requestEntry(Object.assign({ url }, { ...extend }, { method: 'GET' })));
  },
  rPost: (url, data, extend) => {
    // debugger;
    let dataString = '';

    if (extend && extend.header && extend.header['Content-Type'] === 'application/x-www-form-urlencoded') {
      // 表单方式的值
      dataString = qs.stringify(data);
    } else {
      // JSON方式的值
      dataString = JSON.stringify(data);
    }

    return loginingWaitPromise(url, () => requestEntry(Object.assign({ url }, { ...extend }, { method: 'POST', data: dataString })));
  },
  rPut: (url, data, extend) => {
    // debugger;
    return loginingWaitPromise(url, () => requestEntry(Object.assign({ url }, { ...extend }, { method: 'PUT', data: JSON.stringify(data) })));
  },
  rDelete: (url, extend) => {
    // debugger;
    return loginingWaitPromise(url, () => requestEntry(Object.assign({ url }, { ...extend }, { method: 'DELETE' })));
  },
};

export default rpcService;

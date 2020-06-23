/* 开源-组件 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
/* 自研-工具 */
import { setToken } from '@/utilities/storage';
/** 背景图片 */
import IMAGE_BG from '@/cdn/media/images/loginPicture/bg.jpg';
/** 页尾 */
import Footer from '@/pages/auth/components/Footer';
/* 数据 */
import { store, addAsyncModel, history } from 'dva';
import { List } from './model';
/* 样式 */
import styles from './index.m.less';
addAsyncModel(List);
/* 变量(方便使用) */
const { namespace } = List;
const { dispatch } = store;

export default function Login() {

  // 登录
  const login = values => {
    // 获取到账号密码
    // console.log(values);

    dispatch({ type: namespace + '/rMain', payload: values, success, fail });

    function success(token) {
      setToken(token);

      history.replace('/');
    }

    function fail(error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className={styles['base-pages-auth-Login-content']}>
        <img src={IMAGE_BG} className={styles['base-pages-auth-Login-bg']} />
        <div className={styles['base-pages-auth-Login-submit']}>

          <div className={styles['base-pages-auth-Login-title']}>
            账 号 密 码 登 陆
          </div>
          <Form onFinish={login}>
            <Form.Item name="account" initialValue="" rules={[{ required: true, message: '请输入账号' }]}>
              <Input className={styles['base-pages-auth-Login-input']} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
            </Form.Item>
            <Form.Item name="password" initialValue="" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password className={styles['base-pages-auth-Login-input']} prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
            </Form.Item>
            <div>
              <Button className={styles['base-pages-auth-Login-loginBtn']} type="primary" htmlType="submit">登录</Button>
            </div>
          </Form>
        </div>
        <Footer />
      </div>
      
    </div>
  );
}
/* 开源-组件 */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.m.less';



export default function Login() {
    return (
        <div className={styles['components-footer']}>
            <ul>
                <li><Link to='/'>帮助</Link></li>
                <li><Link to='/'>隐私</Link></li>
                <li><Link to='/'>条款</Link></li>
            </ul>
          copyright &copy; 2020 深圳佳兆业科技集团有限公司出品
        </div>
    );
}
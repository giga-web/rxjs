/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'antd';
/* 自研-组件 */
import componentsForm from '@/components/Form/index.js';
/* 自研-样式 */
import styles from './form.m.less';

class ListFormLayout extends React.Component {

  handleFinish (values) {
    const {reload} = this.props;
    reload({...values, pageindex: 0})
  }
  render() {
    const { fileds = [] } = this.props;

    return (
      <Form onFinish={this.handleFinish.bind(this)}>
        <div className={styles['list-form-layout']}>
          {fileds.map((item, index) => {
            const ComponentName = componentsForm[item.type];

            if (ComponentName) {
              return (
                <div className={styles['list-form-filed']} key={index}>
                  <Form.Item label={item.label} name={item.filed} rules={item.rules} initialValue={item.value}>
                    <ComponentName placeholder={item.placeholder} />
                  </Form.Item>
                </div>
              );
            }

            return null;
          })}
          <Button type="primary" htmlType="submit">查询</Button>
        </div>
      </Form>
    );
  }

}

function mapStateToProps({ Global }) {
  return {
    collapsed: Global.collapsed
  };
}

export default connect(mapStateToProps)(ListFormLayout);

/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Row, Col } from 'antd';
/* 自研-工具 */
import { handlePageTitle } from '@/utilities/framework';
/* 自研-组件 */
import componentsForm from '@/components/Form/index.js';
/* 自研-样式 */
import styles from './index.m.less';
/* 自研 */
import { history } from 'dva';

class FormLayout extends React.Component {

  success() {
    history.goBack();
  }
  handleGoback() {
    history.goBack();
  }
  render() {
    const { fileds = [], loading, handleSubmit } = this.props;

    return (
      <div className={styles['form-layout']}>

        <div className={styles['form-layout-head']}>
          <div className={styles['form-layout-head-back']} onClick={this.handleGoback}>返回</div>
          <div className={styles['form-layout-head-slash']}>/</div>
          <div className={styles['form-layout-head-title']}>{handlePageTitle(history.location.pathname)}</div>
        </div>

        <div className={styles['form-layout-body']}>
          <Form onFinish={handleSubmit.bind(null, this.success)} layout="vertical" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <Row gutter={16}>
              {fileds.map(item => {
                const ComponentName = componentsForm[item.type];

                if (ComponentName) {
                  return (
                    <Col key={item.filed} span={8}>
                      <Form.Item label={item.label} name={item.filed} rules={item.rules} initialValue={item.value}>
                        <ComponentName placeholder={item.placeholder} />
                      </Form.Item>
                    </Col>
                  );
                }

                return null;
              })}
            </Row>

            <div className={styles['form-layout-submit']}>
              <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
            </div>
          </Form>
        </div>

      </div>
    );
  }

}

function mapStateToProps({ Global }) {
  return {
    collapsed: Global.collapsed
  };
}

export default connect(mapStateToProps)(FormLayout);

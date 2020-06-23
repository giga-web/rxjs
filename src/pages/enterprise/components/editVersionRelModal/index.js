/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Row, Col } from 'antd';
/* 自研-组件 */
import componentsForm from '@/components/Form/index.js';
/* 数据 */
import { store, addAsyncModel } from 'dva';
import { editVersionRel } from './model';

addAsyncModel(editVersionRel);
/* 变量(方便使用) */
const { namespace } = editVersionRel;
const { dispatch } = store;

class editVersionRelModal extends React.Component {
  state = {
    visible: false
  }
  obj = {};
  componentWillUnmount () {
    dispatch({ type: namespace + '/clean' });
  }
  componentDidMount() {
    this.reload();
  }
  reload() {
    const { id } = this.props;
    dispatch({ type: namespace + '/rMain', payload: {id} });
  }
  handleCom = (visible) => {
    const { enterpriseVersionRel } = this.props;
    this.setState({
      visible
    });
    if (visible) {
      dispatch({ type: namespace + '/rGet', payload: enterpriseVersionRel });
    }
  }
  handleOk = () => {
    const { handleSubmit, enterpriseVersionRel } = this.props;
    this.setState({
      visible: false
    });
    let parmas = {
      id: enterpriseVersionRel.id,
      data: this.obj
    }
    dispatch({ type: namespace + '/rPut', payload: parmas, success: () => {
        handleSubmit(this.obj);
      }});
  }

  trigger = (e, filed) => {
    this.obj[filed] = e.target.value;
  }
  render() {
    const { visible } = this.state;
    const { config = {}, manData, loading } = this.props.pagedata;
    return (
      <div>
        <Button onClick={() => this.handleCom(true)}>修改</Button>
        <Modal
          title="修改付费订阅"
          visible={visible}
          okText={'确定'}
          keyboard={true}
          onOk={this.handleOk}
          onCancel={() => this.handleCom(false)}
        >
          <div>
            <Row gutter={16}>
              {
                config.form ? config.form.map(item => {
                  const ComponentName = componentsForm[item.type];

                  if (ComponentName) {
                    return (
                      <Col key={item.filed} span={16}>
                        <Form.Item onChange={(e) => this.trigger(e, item.filed)} label={item.label} name={item.filed} rules={item.rules} initialValue={item.value}>
                          <ComponentName placeholder={item.placeholder} />
                        </Form.Item>
                      </Col>
                    );
                  }

                  return null;
                }) : ''}
            </Row>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { pagedata: Object.assign({ ...state[namespace] }, { loading: {
        rMain: state.loading.effects[namespace + '/' + 'rMain'],
      }})};
}

export default connect(mapStateToProps)(editVersionRelModal);
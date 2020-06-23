/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Row, Col } from 'antd';
/* 自研-组件 */
import componentsForm from '@/components/Form/index.js';
/* 数据 */
import { store, addAsyncModel } from 'dva';
import { editMan } from './model';
addAsyncModel(editMan);
/* 变量(方便使用) */
const { namespace } = editMan;
const { dispatch } = store;
class editManModal extends React.Component {
  state = {
    visible: false,
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

  async handleCom(visible) {
    const { mainManager } = this.props;
    await this.setState({
      visible
    });
    if (visible) {
      if (mainManager && mainManager.id) {
        dispatch({ type: namespace + '/rGet', payload: mainManager });
      }
    }
  }
  handleOk = () => {
    const { handleSubmit, mainManager, id } = this.props;
    this.setState({
      visible: false
    });
    if (mainManager) {
      this.obj.id = mainManager.id;
      dispatch({ type: namespace + '/rPut', payload: this.obj, success: () => {
          handleSubmit(this.obj);
        }});
    } else {
      let data = {...this.obj, password: '111'}
      let parmas = {
        id,
        data: data
      }
      dispatch({ type: namespace + '/rPost', payload: parmas, success: () => {
          handleSubmit(this.obj);
        }
      });
    }
  }
  trigger = (e, filed) => {
    this.obj[filed] = e.target.value;
  }

  render() {
    const { visible } = this.state;
    const { config = {}, loading } = this.props.pagedata;
    const { mainManager } = this.props
    return (
      <div>
        {
          mainManager ? <Button onClick={() => this.handleCom(true)}>修改</Button> : <Button type="primary" onClick={() => this.handleCom(true)}>新增</Button>
        }

        <Modal
          title="修改主管理员"
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
        rGet: state.loading.effects[namespace + '/' + 'rGet'],
        rPut: state.loading.effects[namespace + '/' + 'rPut'],
        rPost: state.loading.effects[namespace + '/' + 'rPost'],
      }})};
}

export default connect(mapStateToProps)(editManModal);
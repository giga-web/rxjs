/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
/* 自研-组件 */
import componentsView from '@/components/View/index.js';
/* 自研-样式 */
import styles from './index.m.less';
/* 自研 */
import { history } from 'dva';
class ViewLayout extends React.Component {
  handleGoback() {
    history.goBack();
  }
  render() {
    const { title, fileds = [], data = {} } = this.props;

    // 标题
    let headline = '';

    const views = fileds.map((item, index) => {
      const value = data[item.filed];

      // 返回值没有对应的字段
      if (value === undefined) {
        return null;
      }

      // 抽取标题
      if (index === 0) {
        headline = value;
        return null;
      }

      // 赋值
      item.value = value;

      return item;
    });

    return (
      <div className={styles['view-layout']}>

        <div className={styles['view-layout-head']}>
          <div className={styles['view-layout-head-back']} onClick={this.handleGoback}>返回</div>
          <div className={styles['view-layout-head-slash']}>/</div>
          <div className={styles['view-layout-head-title']}>{title}</div>
        </div>

        <div className={styles['view-layout-body']}>

          <div className={styles['view-layout-body-title']}>{headline}</div>

          <div className={styles['view-layout-group']}>
            <div className={styles['view-layout-group-notitle']} />
            <Row>
              {views.map((item, index) => {
                // 空值返回
                if (item === null) { return null }

                // TODO：待修改
                const ComponentName = componentsView[item.type];
                const ViewText = componentsView['ViewText'];

                return (
                  <Col key={index} span={8}>
                    <div className={styles['view-layout-filed']}>
                      <div className={styles['view-layout-filed-label']}>{item.label}</div>
                      <div className={styles['view-layout-filed-value']}>
                        {ComponentName ? <ComponentName value={item.value} /> : <ViewText value={item.value} />}
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>

          {this.props.children}

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

export default connect(mapStateToProps)(ViewLayout);

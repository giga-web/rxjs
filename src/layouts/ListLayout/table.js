/* 开源-组件 */
import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
/* 自研-组件 */
import componentsTable from '@/components/Table/index.js';
/* 自研-样式 */
import styles from './table.m.less';

class ListTableLayout extends React.Component {

  // 分页、排序、筛选变化时触发
  handleChange(pagination, filters, sorter) {
    const { reload } = this.props;

    const params = {
      pageindex: pagination.current - 1
    };

    reload && reload(params);
  }

  render() {
    const { data = {}, fileds = [], loading = true } = this.props;

    // 表格列
    const columns = fileds.map(item => {

      if (item.render) {
        return item;
      }

      item.render = (text, record, index) => {

        if (item.type) {
          const ComponentName = componentsTable[item.type];

          if (ComponentName) {
            return <ComponentName text={text} record={record} index={index} />
          }

          return text;
        }

        return text;
      }

      return item;
    });

    // 分页
    const pagination = {
      total: data.totalRecords,
      current: data.pageIndex === undefined ? 1 : data.pageIndex + 1,
      pageSize: data.pageSize,
      showSizeChanger: false,
      showTotal: (total, range) => `${range[0]}/${range[1]}，共 ${total} 条`,
    };

    return (
      <div className={styles['list-table-layout']}>
        <div className={styles['list-table-layout-operations']}>
          {this.props.children}
        </div>
        <div className={styles['list-table']}>
          <Table
            rowKey="id"
            dataSource={ data.entities}
            columns={columns}
            loading={loading}
            pagination={data.pageSize ? pagination : false}
            onChange={this.handleChange.bind(this)}
          />
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

export default connect(mapStateToProps)(ListTableLayout);

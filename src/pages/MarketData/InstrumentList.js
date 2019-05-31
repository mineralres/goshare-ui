import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Table,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './InstrumentList.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ marketdata, loading }) => ({
  instrument: marketdata,
  loading: loading.effects['marketdata/fetch'],
}))
@Form.create()
class InstrumentList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    filter: {
      exchange: -1
    }
  };

  columns = [
    {
      title: 'Index',
      dataIndex: 'index',
    },
    {
      title: '交易所',
      dataIndex: 'symbol.exchange',
      render: (text) => {
        switch (text) {
          case 0:
            return '上期所'
          case 2:
            return '大商所'
          case 1:
            return '郑商所'
          case 3:
            return '中金所'
          case 21:
            return '上能所'
          case 4:
            return '上交所'
          case 5:
            return '深交所'
        }
        return text
      }
    },
    {
      title: '合约代码',
      dataIndex: 'symbol.code',
    },
    {
      title: '名称',
      dataIndex: 'instrumentInfo.symbolName',
    },
    {
      title: '最小变动',
      dataIndex: 'productInfo.priceTick',
    },
    {
      title: '合约乘数',
      dataIndex: 'productInfo.volumeMultiple',
    },
    {
      title: '涨停价',
      dataIndex: 'instrumentInfo.upperLimitPrice',
    },
    {
      title: '跌停价',
      dataIndex: 'instrumentInfo.lowerLimitPrice',
    },
    {
      title: '结算价',
      dataIndex: 'instrumentInfo.settlementPrice',
      render: (val) => (val > 999999 ? '-' : val)
    },
    {
      title: '昨持仓',
      dataIndex: 'instrumentInfo.prePosition',
    },
    {
      title: '交易日',
      dataIndex: 'instrumentInfo.updateTradingDay',
    },
    {
      title: '上市日',
      dataIndex: 'instrumentInfo.createDate',
    },
    {
      title: '到期日',
      dataIndex: 'instrumentInfo.startDeliverDate',
    },
    {
      title: '交易中',
      dataIndex: 'instrumentInfo',
      render: (val) => {
        if (val.isTrading) {
          return <Badge status="success" text="是"></Badge>
        }
        return <Badge status="error" text="否"></Badge>
      }
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'marketdata/fetch',
      payload: 0,
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      filter: {
        exchange: -1,
      },
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
        filter: {
          exchange: values.status
        }
      });
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="交易所">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">上期所</Option>
                  <Option value="1">郑商所</Option>
                  <Option value="2">大商所</Option>
                  <Option value="3">中金所</Option>
                  <Option value="21">上能所</Option>
                  <Option value="4">上交所</Option>
                  <Option value="5">深交所</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      instrument: { list },
      loading,
    } = this.props;
    const { selectedRows, stepFormValues } = this.state;

    const { filter } = this.state
    return (
      <PageHeaderWrapper title="合约列表">
        <Card bordered={false}>
          <div className={styles.instrumentList}>
            <div className={styles.instrumentListForm}>{this.renderForm()}</div>
            <Table
              rowKey={(record) => record.index}
              selectedRows={selectedRows}
              loading={loading}
              dataSource={list.filter(e => {
                return filter.exchange == null || filter.exchange < 0 || e.symbol.exchange == filter.exchange
              })}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default InstrumentList;

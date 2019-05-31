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
    Tag,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './MainContract.less';

const Color = {
    green: '#64ea91',
    blue: '#8fc9fb',
    purple: '#d897eb',
    red: '#f69899',
    yellow: '#f8c82e',
    peach: '#f797d6',
    borderBase: '#e5e5e5',
    borderSplit: '#f4f4f4',
    grass: '#d6fbb5',
    sky: '#c1e0fc',
};

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');

function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}

/* eslint react/no-multi-comp:0 */
@connect(({ marketdata, loading }) => ({
    list: marketdata.mainContract,
    loading: loading.effects['marketdata/fetchMainContract'],
}))
@Form.create()
class MainContract extends PureComponent {
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
            dataIndex: 'name',
            render: (text, it) => (
                <span >{text}</span>
            ),
        },
        {
            title: '现价',
            dataIndex: 'price',
            render: (text, it) => (
                <span >{text}</span>
            ),
        },
        {
            title: '涨跌',
            dataIndex: 'upDownRatio',
            render: (text, it) => {
                if (it.upDownRatio > 0) {
                    return <Tag color={Color.red}>{text}%</Tag>
                }
                return <Tag color={Color.green}>{text}%</Tag>
            },
        },
        {
            title: '成交量',
            dataIndex: 'volume',
            render: (text, it) => (
                <span >{text}</span>
            ),
        },
        {
            title: '持仓量',
            dataIndex: 'position',
            render: (text, it) => (
                <span >{text}</span>
            ),
        },
        {
            title: '昨结算',
            dataIndex: 'preSettlementPrice',
            render: (text, it) => (
                <span >{text}</span>
            ),
        },
        {
            title: '时间',
            dataIndex: 'time',
            render: (text, it) => `${moment(text).format('YYYY-MM-DD HH:mm:ss')}.${PrefixInteger(it.milliseconds, 3)}`,
        },
    ];

    componentDidMount() {
    }

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
            dispatch({
                type: 'marketdata/fetchMainContract',
                payload: 0
            })
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

    onTableChange = (pagination, filtersArg, sorter) => {
        console.log(pagination, filtersArg, sorter)
    }

    render() {
        const {
            list,
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
                            onChange={this.onTableChange}
                        />
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default MainContract;

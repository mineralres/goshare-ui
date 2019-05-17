import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Tag, Button, Spin, Row, Col } from 'antd'
import { Color } from 'utils'
import styles from './dcenter.less'
import { Trans, withI18n } from '@lingui/react'

const status = {
    1: {
        color: Color.green,
    },
    2: {
        color: Color.red,
    },
    3: {
        color: Color.blue,
    },
    4: {
        color: Color.yellow,
    },
}

@withI18n()
class DCenter extends Component {
    componentDidMount() {
        this.setState({
            timer: setInterval(() => {
                this.handleRefresh()
            }, 5000)
        })
    }
    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    handleRefresh = () => {
        window.g_app._store.dispatch({ type: 'dashboard/queryDCenterInfo' })
    }

    render() {
        const { data, loading } = this.props
        const columns = [
            {
                title: 'name',
                dataIndex: 'name',
                className: styles.name,
            },
            {
                title: 'percent',
                dataIndex: 'percent',
                className: styles.percent,
                render: (text, it) => <Tag color={status[it.status].color}>{text}</Tag>,
            },
        ]
        return (
            <div className={styles.dcenter}>
                <Row type="flex" justify="center">
                    <Col span={8}>
                        <div className={styles.title}>缓存摘要</div>
                    </Col>
                    <Col span={4}>
                        <Button
                            type="primary"
                            className="margin-right"
                            loading={loading}
                            onClick={this.handleRefresh}
                        >
                            <Trans>刷新</Trans>
                        </Button>
                    </Col>

                </Row>

                <Table
                    pagination={false}
                    showHeader={false}
                    columns={columns}
                    rowKey={(record, key) => key}
                    dataSource={data}
                />
            </div>
        )
    }

}

DCenter.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
}

export default DCenter

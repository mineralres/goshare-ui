import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { Color } from 'utils'
import styles from './marketData.less'


class RecentSales extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ws: 0,
      data: []
    }
  }

  decimalDigits = src => {
    let v = src.toString().split('.')
    if (v.length > 1) {
      return v[1].length
    }
    return 0
  }

  componentDidMount() {
    var url = `ws://${window.location.host}/ws/v1/dcenter/subscribe`
    if (window.location.protocol === 'https') {
      url = `wss://${window.location.host}/ws/v1/dcenter/subscribe`
    }
    console.log('window.location', url)
    var _this = this
    // 订阅行情
    url = 'ws://localhost:9090/ws/v1/dcenter/subscribe'
    var fx = () => {
      var ws = new WebSocket(url);
      ws.onopen = function (evt) {
        console.log("Connection open ...");
        const list = [
          { "exchange": "SHFE", "code": "ru1909" },
          { "exchange": "DCE", "code": "i1909" },
          { "exchange": "CZCE", "code": "CF909" },
          { "exchange": "CFFEX", "code": "IF1906" },
          { "exchange": "INE", "code": "sc1906" },
        ]
        ws.send(JSON.stringify({ list }));
      };

      ws.onmessage = function (evt) {
        const md = JSON.parse(evt.data)
        md.time = md.time * 1000
        md.digits = _this.decimalDigits(md.priceTick)
        md.price = md.price.toFixed(md.digits)
        if (md.preSettlementPrice > 0) {
          md.upDownRatio = (md.price - md.preSettlementPrice) / md.preSettlementPrice
          md.upDownRatio = (md.upDownRatio * 100).toFixed(2)
        } else {
          md.upDownRatio = '--'
        }

        _this.setState(prevState => {
          let newData = [...prevState.data]
          let index = newData.findIndex(el => el.symbol.exchange === md.symbol.exchange && el.symbol.code === md.symbol.code)
          console.log("Received Message: " + `${md.price} ${md.symbol.exchange}`, index);
          if (index >= 0) {
            md.index = index + 1
            newData[index] = md
          } else {
            md.index = newData.length + 1
            newData.push(md)
          }
          return {
            data: newData
          }
        })
      };

      ws.onclose = function (evt) {
        console.log("Connection closed. reopen ", new Date());
        fx()
      }
      ws.onerror = (err) => {
        console.log('err', err)
      }
      this.setState({ ws: ws })
    }
    fx()
  }
  render() {
    const columns = [
      {
        title: 'Index',
        dataIndex: 'index',
      },
      {
        title: '交易所',
        dataIndex: 'symbol.exchange',
        render: (text) => {
          switch (text) {
            case 'SHFE':
              return '上期所'
            case 'DCE':
              return '大商所'
            case 'CZCE':
              return '郑商所'
            case 'CFFEX':
              return '中金所'
            case 'INE':
              return '上能所'
          }
          return text
        }
      },
      {
        title: '代码',
        dataIndex: 'symbol.code',
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
        title: '名称',
        dataIndex: 'name',
        render: (text, it) => (
          <span >{text}</span>
        ),
      },
      {
        title: '时间',
        dataIndex: 'time',
        render: text => moment(text).format('YYYY-MM-DD hh:mm:ss'),
      },
    ]
    return (
      <div className={styles.recentsales}>
        <Table
          pagination={false}
          columns={columns}
          rowKey={(record, key) => key}
          dataSource={this.state.data.filter((item, key) => key < 5)}
        />
      </div>
    )
  }

}

RecentSales.propTypes = {
  data: PropTypes.array,
}

export default RecentSales

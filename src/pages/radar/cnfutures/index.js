
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Page, ScrollBar } from 'components'
import { Row, Col, Card } from 'antd'
import styles from './index.less';

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

class CNFutures extends PureComponent {
  render() {
    return (
      <Page>
        <Row gutter={24}>
          <Col lg={12} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <div className={styles.normal}>
                <h1>内盘期货</h1>
              </div>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default CNFutures

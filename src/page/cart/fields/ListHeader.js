import { Row, Col, Typography } from 'antd';

const {Title} = Typography;

export default function ListHeader() {

  return (
    <Row style={{ paddingLeft: 25, paddingRight: 25 }} gutter={10} align='middle'>
      <Col span={3}>
        <Title level={5} style={{ margin: 0 }}>
          圖片
        </Title>
      </Col>
      <Col span={5}>
        <Title level={5} style={{ margin: 0 }}>
          名稱
        </Title>
      </Col>
      <Col span={4}>
        <Title level={5} style={{ margin: 0 }}>
          規格
        </Title>
      </Col>
      <Col span={3}>
        <Title level={5} style={{ margin: 0 }}>
          單價
        </Title>
      </Col>
      <Col span={3}>
        <Title level={5} style={{ margin: 0 }}>
          數量
        </Title>
      </Col>
      <Col span={3}>
        <Title level={5} style={{ margin: 0 }}>
          總計
        </Title>
      </Col>
      <Col span={3}>
        <Title level={5} style={{ margin: 0 }}>
          操作
        </Title>
      </Col>
    </Row>
  );
}

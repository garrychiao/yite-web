import { Row, Col, } from 'antd';
import { Section } from 'shared/layout';
import LoginButton from './LoginButton';

export default function LoginPage() {

  return (
    <Section.Container>
      <Section>
        <Row justify='center'>
          <Col>
            <LoginButton />
          </Col>
        </Row>
      </Section>
    </Section.Container>
  );
}

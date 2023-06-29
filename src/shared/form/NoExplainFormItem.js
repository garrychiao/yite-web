import styled from 'styled-components';
import { Form } from 'antd';

const NoExplainFormItem = styled(Form.Item)`
  margin-bottom: 0;
  .ant-form-item-explain {
    display: none;
  }
`;

export default NoExplainFormItem;

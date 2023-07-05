import { useState } from 'react';
import styled from 'styled-components';
import { Card, Button, InputNumber } from 'antd';
import color from 'shared/style/color';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';


export default function CartCountOperator ({initvalue = 0}) {

  const [count, setCount] = useState(initvalue);

  return (<Container>
    <OperationContainer onClick={() => {
      if (count > 0) setCount(count - 1)
    }}>
      <MinusOutlined />
    </OperationContainer>
    <InputContainer>
      <InputNumber controls={false} value={count} min={0} step={1} />
    </InputContainer>
    <OperationContainer onClick={() => {
      setCount(count + 1);
    }}>
      <PlusOutlined />
    </OperationContainer>
  </Container>)

}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 25px;
`

const OperationContainer = styled.div`
  flex: 1;
  cursor: pointer;
`

const InputContainer = styled.div`
  flex: 4;
`
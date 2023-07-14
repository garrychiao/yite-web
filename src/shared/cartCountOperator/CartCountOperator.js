import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, Button, InputNumber } from 'antd';
import color from 'shared/style/color';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';


export default function CartCountOperator ({initvalue = 1, onChange = () => {}}) {

  const [count, setCount] = useState(initvalue);
  const { run: runDebounce } = useDebounceFn(
    (value) => {
      onChange(value);
    },
    {
      wait: 500,
    },
  );
  
  const onValueChange = (value) => {
    runDebounce(value);
    setCount(value);
  }

  useEffect(()=> {
    setCount(initvalue);
  }, [initvalue])

  return (<Container>
    <OperationContainer onClick={() => {
      if (count > 1) onValueChange(count - 1)
    }}>
      <MinusOutlined />
    </OperationContainer>
    <InputContainer>
      <InputNumber controls={false} value={count} min={1} step={1} onChange={onValueChange} />
    </InputContainer>
    <OperationContainer onClick={() => {
      onValueChange(count + 1);
    }}>
      <PlusOutlined />
    </OperationContainer>
  </Container>)

}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  border: 1px solid grey;
  width: 120px;
`

const OperationContainer = styled.div`
  flex: 1;
  cursor: pointer;
  text-align: center;
`

const InputContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  .ant-input-number-input {
    text-align: center;
    width: 100%;
  }
  .ant-input-number {
    width: 60px;
    border-radius: 0;
  }
`
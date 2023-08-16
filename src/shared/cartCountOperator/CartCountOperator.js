import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, Button, InputNumber, Typography } from 'antd';
import color from 'shared/style/color';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';

const { Text } = Typography;


export default function CartCountOperator({ initvalue = 1, onChange = () => { }, maximum = 99999 }) {

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
    if (value <= maximum) {
      runDebounce(value);
      setCount(value);
    } else {
      setCount(maximum);
      runDebounce(maximum);
    }
  }

  useEffect(() => {
    setCount(initvalue);
  }, [initvalue])

  return (
    <>
      <Container>
        <OperationContainer onClick={() => {
          if (maximum > 0) {
            if (count > 1) onValueChange(count - 1)
          }
        }}>
          <MinusOutlined />
        </OperationContainer>
        <InputContainer>
          <InputNumber controls={false} value={count} min={1} step={1} onChange={onValueChange} />
        </InputContainer>
        <OperationContainer onClick={() => {
          if (maximum > 0) {
            onValueChange(count + 1);
          }
        }}>
          <PlusOutlined />
        </OperationContainer>
      </Container>
      {maximum}
      {/* {
        (count > maximum && maximum !== 0) && <Text style={{ textAlign: 'center', color: 'red' }}>超出庫存上限</Text>
      } */}
      
    </>
  )

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
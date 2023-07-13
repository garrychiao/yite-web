import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Button } from 'antd';
import color from 'shared/style/color';

export default function ButtonGroup ({items = [], selectedIndex, size = 'large', onChange = () => {}}) {

  const [selected, setSelected] = useState(selectedIndex);

  // useEffect(() => {
  //   setSelected(selectedIndex);
  // }, [])

  return (<Container>
    {items.map((item, index) => (
      <Button 
        key={index} 
        size={size}
        ghost 
        danger={(selected === item.value)}
        type="primary"
        onClick={() => {
          console.log(item.value);
          setSelected(item.value);
          onChange(item.value);
        }}>{item.name}</Button>
    ))}
  </Container>)

}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`
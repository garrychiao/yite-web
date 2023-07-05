import { useState } from 'react';
import styled from 'styled-components';
import { Card, Button } from 'antd';
import color from 'shared/style/color';

export default function ButtonGroup ({items = [], selectedIndex}) {

  const [selected, setSelected] = useState(selectedIndex);
  console.log(`items`)
  console.log(items)

  return (<Container>
    {items.map((item, index) => (
      <Button 
        key={index} 
        ghost 
        danger={(selected === item.value)}
        type="primary"
        size='large'
        onClick={() => {
          console.log(item.value);
          setSelected(item.value);
        }}>{item.name}</Button>
    ))}
  </Container>)

}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`
import i18n from 'i18next';
import styled from 'styled-components';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

const DEFAULT_WIDTH = 300;

export default function SearchInput({
  width = DEFAULT_WIDTH,
  onSearch,
  onChange,
}) {
  const [keyword, setKeyword] = useState('');
  return (
    <Input.Group style={{ width }} compact>
      <StyledInput
        onChange={(evt) => {
          setKeyword(evt.target.value);
          onChange(evt.target.value);
        }}
        defaultValue={keyword}
        placeholder={i18n.t('請輸入關鍵字')}
      />
      <Button
        onClick={() => onSearch(keyword)}
        type="primary"
        icon={<SearchOutlined />}
      />
    </Input.Group>
  );
}

const StyledInput = styled(Input)`
  && {
    width: calc(100% - 40px);
  }
`;

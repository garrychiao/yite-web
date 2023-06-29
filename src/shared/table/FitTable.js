import styled from 'styled-components';
import { useRef } from 'react';
import { useSize } from 'ahooks';
import { Table } from 'antd';

// make antd table auto fit the container height
// ! have to be a children of flex parent (direction: column)
export default function FitTable(props) {
  const ref = useRef(null);
  const containerSize = useSize(ref);
  const headerSize = useSize(ref.current?.querySelector('.ant-table-header'));
  const containerHeight = containerSize?.height ?? 0;
  const headerHeight = headerSize?.height ?? 0;

  return (
    <TableContainer ref={ref}>
      <Table
        rowKey="id"
        pagination={false}
        showSorterTooltip={false}
        scroll={{ y: containerHeight - headerHeight || 0 }}
        {...props}
      />
    </TableContainer>
  );
}

const TableContainer = styled.div`
  flex: 1;
  height: 0;
  .ant-table-cell .ant-select {
    width: 100%;
  }
  .ant-table-body {
    overflow: auto !important;
  }
`;

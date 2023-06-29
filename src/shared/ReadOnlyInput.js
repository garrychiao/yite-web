import { Input } from 'antd';

export default function ReadOnlyInput(props) {
  return (
    <Input
      readOnly
      bordered={false}
      style={{ paddingLeft: 0, paddingRight: 0 }}
      {...props}
    />
  );
}

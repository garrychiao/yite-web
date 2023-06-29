import _ from 'lodash';
import { Form } from 'antd';
import shouldUpdateByKey from './shouldUpdateByKey';

export default function FormItemByKey({ by, children }) {
  return (
    <Form.Item shouldUpdate={shouldUpdateByKey(by)} noStyle>
      {(updatedForm) => {
        const fieldKey = _.split(by, '.');
        const type = updatedForm.getFieldValue(fieldKey);
        return _.isFunction(children) ? children(type) : children;
      }}
    </Form.Item>
  );
}

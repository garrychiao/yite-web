import _ from 'lodash';
import { notification } from 'antd';

export default function notifyFirstError(
  error,
  { ignoreEmpty = true, defaultError = null } = {}
) {
  const errors = _.flatMap(error?.errorFields, 'errors');
  const description = ignoreEmpty ? _.compact(errors)[0] : errors[0];
  if (description) {
    return notification.error({ description });
  }
  if (defaultError) {
    return notification.error({ description: defaultError });
  }
}

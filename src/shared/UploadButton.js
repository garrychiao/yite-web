import i18n from 'i18next';
import { Button, Upload } from 'antd';

export default function UploadButton({
  buttonLabel = i18n.t('上傳檔案'),
  buttonProps,
  ...restProps
}) {
  return (
    <Upload {...restProps}>
      <Button {...buttonProps}>{buttonLabel}</Button>
    </Upload>
  );
}

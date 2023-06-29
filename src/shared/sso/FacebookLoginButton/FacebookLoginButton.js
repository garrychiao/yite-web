import i18n from 'i18next';
import log from 'loglevel';
import { useMemo } from 'react';
import { useRequest } from 'ahooks';
import { Typography } from 'antd';
import { FacebookAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import SsoButton from '../SsoButton';
import { ReactComponent as FacebookIcon } from './login-facebook.svg';

const { Link } = Typography;

export default function FacebookLoginButton(props) {
  const provider = useMemo(() => new FacebookAuthProvider(), []);
  // non-chrome browser signin issue with signInWithRedirect
  // https://github.com/firebase/firebase-js-sdk/issues/6443#issuecomment-1187798276
  const { loading, run: runGoogleLogin } = useRequest(signInWithPopup, {
    manual: true,
    onError: (err) => log.error('FacebookLoginButton:onClick', err),
  });

  const onClick = async () => {
    const firebaseAuth = getAuth();
    await runGoogleLogin(firebaseAuth, provider);
  };

  return (
    <SsoButton size="large" onClick={onClick} loading={loading} {...props}>
      <FacebookIcon />
      <Link>{i18n.t('使用 Facebook 登入')}</Link>
    </SsoButton>
  );
}

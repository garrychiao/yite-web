import i18n from 'i18next';
import log from 'loglevel';
import { useMemo } from 'react';
import { useRequest } from 'ahooks';
import { Typography } from 'antd';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import SsoButton from '../SsoButton';
import { ReactComponent as GoogleIcon } from './login-google.svg';

const { Link } = Typography;

export default function GoogleLoginButton(props) {
  const provider = useMemo(() => new GoogleAuthProvider(), []);
  // non-chrome browser signin issue with signInWithRedirect
  // https://github.com/firebase/firebase-js-sdk/issues/6443#issuecomment-1187798276
  const { loading, run: runGoogleLogin } = useRequest(signInWithPopup, {
    manual: true,
    onSuccess: () => window.location.reload(),
    onError: (err) => log.error('GoogleLoginButton:onClick', err),
  });

  const onClick = async () => {
    const firebaseAuth = getAuth();
    await runGoogleLogin(firebaseAuth, provider);
  };

  return (
    <SsoButton size="large" onClick={onClick} loading={loading} {...props}>
      <GoogleIcon />
      <Link>{i18n.t('使用 Google 登入')}</Link>
    </SsoButton>
  );
}

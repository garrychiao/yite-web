import i18n from 'i18next';
import log from 'loglevel';
import { useMemo } from 'react';
import { useRequest } from 'ahooks';
import { Typography } from 'antd';
import { getAuth, OAuthProvider, signInWithPopup } from 'firebase/auth';
import SsoButton from '../SsoButton';
import microsoftIcon from './login-microsoft.png';

const { Link } = Typography;

export default function MicrosoftLoginButton(props) {
  const provider = useMemo(() => new OAuthProvider('microsoft.com'), []);
  // non-chrome browser signin issue with signInWithRedirect
  // https://github.com/firebase/firebase-js-sdk/issues/6443#issuecomment-1187798276
  const { loading, run: runGoogleLogin } = useRequest(signInWithPopup, {
    manual: true,
    onSuccess: () => window.location.reload(),
    onError: (err) => log.error('MicrosoftLoginButton:onClick', err),
  });

  const onClick = async () => {
    const firebaseAuth = getAuth();
    await runGoogleLogin(firebaseAuth, provider);
  };

  return (
    <SsoButton size="large" onClick={onClick} loading={loading} {...props}>
      <img src={microsoftIcon} alt="Microsoft Icon" width={25} height={25} />
      <Link>{i18n.t('使用 Microsoft 登入')}</Link>
    </SsoButton>
  );
}

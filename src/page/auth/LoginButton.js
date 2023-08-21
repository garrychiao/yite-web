import { Button } from 'antd';

export default function LoginButton() {

  return (
    <Button
      style={{
        background: '#06c755',
        color: 'white',
      }}
      size='large'
      onClick={() => {
        // console.log(`https://yite-api.meproz.com/auth/line?frontend_url=${window.location.origin}/login/result`)
        window.open(`https://yite-api.meproz.com/auth/line?frontend_url=${window.location.origin}/login/result`, '_blank');
      }}>Line 登入</Button>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { notification } from "antd";

export default function RequireAuth({children, required = false, requiredEnable = false, nonAuth = false}) {

  const navigate = useNavigate();
  const auth = useAuthUser();
  const user = auth();
  
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (required && !user) {
      return navigate('/login');
    } 
    if (requiredEnable && !user?.enable) {
      notification.error({
        message: '您的用戶已被停權'
      });
      return navigate(-1);
    } 
    if (nonAuth && user) {
      return navigate('/');
    }
    setIsReady(true);
  }, [user])

  return (
    <>{isReady ? children : <></>}</>
  );
}

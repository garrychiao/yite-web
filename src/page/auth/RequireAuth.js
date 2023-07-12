import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

export default function RequireAuth({children, required = false, nonAuth = false}) {

  const navigate = useNavigate();
  const auth = useAuthUser();
  const user = auth();
  
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (required && !user) {
      return navigate('/login');
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

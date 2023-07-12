import _ from 'lodash';
import log from 'loglevel';
import { createContext, useMemo, useState, useEffect } from 'react';
import { useBoolean, useMount, useMemoizedFn, useRequest } from 'ahooks';
import PropTypes from 'prop-types';
import FullSpin from 'shared/FullSpin';

export const AuthContext = createContext({
  onUserTokenFetched: () => {},
  getUser: () => {},
  // signOut: () => {},
  // isAdmin: false,
});

export default function AuthProvider({ children }) {
  
  // const [user, getUser] = useState(null);
  // const [userToken, setUserToken] = useState('');
  // console.log(`userToken`);
  // console.log(userToken);
  // const [uindex, setUIndex] = useState(0);
  // const roleList = [
  //   {
  //     level: '',
  //     name: 'Normal User',
  //     token: '',
  //   },
  //   {
  //     level: 'A',
  //     name: 'Level A User',
  //     token: 'ewoiY3VzdG9tZXJHcmFkZSI6ICJBIgp9',
  //   },
  //   {
  //     level: 'B',
  //     name: 'Level B User',
  //     token: 'ewoiY3VzdG9tZXJHcmFkZSI6ICJCIgp9',
  //   },
  // ]
  
  // const [user, getUser] = useState(roleList[uindex]);
  // console.log(uindex)
  
  // const switchUser = () => {
  //   console.log('user switching')
  //   if (uindex === roleList.length - 1) {
  //     getUser(roleList[0]);
  //     setUIndex(0);
  //     onUserSwitched('');
  //   } else {
  //     getUser(roleList[uindex +1]);
  //     onUserSwitched(roleList[uindex +1].token);
  //     setUIndex(uindex +1);
  //   }
    
  // }

  const getUser = () => {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }

  const onUserTokenFetched = (token = '') => {
    try {
      localStorage.setItem(
        'token',
        token
      );
    } catch (error) {
      console.error('Error:onUserTokenFetched:', error);
    }
  }

  // useEffect(() => {
  //   switchUser()
  // }, [])
  // const signOut = useMemoizedFn(async () => {
  //   const firebaseAuth = getAuth();
  //   try {
  //     return await firebaseSignOut(firebaseAuth);
  //   } catch (err) {
  //     log.error('AuthProvider:signOut', err);
  //   }
  // });

  const contextValue = useMemo(
    () => ({ onUserTokenFetched, getUser }),
    [onUserTokenFetched, getUser]
  );

  // if (!isAuthReady) return <FullSpin tip={i18n.t('驗證中...')} />;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired };
AuthProvider.defaultProps = {};

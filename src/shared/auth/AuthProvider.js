import _ from 'lodash';
import log from 'loglevel';
import { createContext, useMemo, useState, useEffect } from 'react';
import { useBoolean, useMount, useMemoizedFn, useRequest } from 'ahooks';
import PropTypes from 'prop-types';
import FullSpin from 'shared/FullSpin';

export const AuthContext = createContext({
  user: null,
  switchUser: () => {},
  // signOut: () => {},
  // isAdmin: false,
});

export default function AuthProvider({ children }) {
  
  const [uindex, setUIndex] = useState(0);
  const roleList = [
    {
      level: '',
      name: 'Normal User',
      token: '',
    },
    {
      level: 'A',
      name: 'Level A User',
      token: 'ewoiY3VzdG9tZXJHcmFkZSI6ICJBIgp9',
    },
    {
      level: 'B',
      name: 'Level B User',
      token: 'ewoiY3VzdG9tZXJHcmFkZSI6ICJCIgp9',
    },
    // {
    //   level: 'C',
    //   name: 'Level C User',
    //   token: 'ewoiY3VzdG9tZXJHcmFkZSI6ICJDIgp9',
    // },
    // {
    //   level: 'D',
    //   name: 'Level D User',
    //   token: 'ewoiY3VzdG9tZXJHcmFkZSI6ICJEIgp9',
    // },
    // {
    //   level: 'E',
    //   name: 'Level E User',
    //   token: 'ewoiY3VzdG9tZXJHcmFkZSI6ICJFIgp9',
    // },
  ]
  
  const [user, setUser] = useState(roleList[uindex]);
  // console.log(uindex)
  
  const switchUser = () => {
    console.log('user switching')
    if (uindex === roleList.length - 1) {
      setUser(roleList[0]);
      setUIndex(0);
      onUserSwitched('');
    } else {
      setUser(roleList[uindex +1]);
      onUserSwitched(roleList[uindex +1].token);
      setUIndex(uindex +1);
    }
    
  }

  const onUserSwitched = (token = '') => {
    try {
      localStorage.setItem(
        'token',
        token
      );
    } catch (error) {
      console.error('Error:onUserSwithced:', error);
    }
  }

  useEffect(() => {
    switchUser()
  }, [])
  // const signOut = useMemoizedFn(async () => {
  //   const firebaseAuth = getAuth();
  //   try {
  //     return await firebaseSignOut(firebaseAuth);
  //   } catch (err) {
  //     log.error('AuthProvider:signOut', err);
  //   }
  // });

  const contextValue = useMemo(
    () => ({ user, switchUser }),
    [user, switchUser]
  );

  // if (!isAuthReady) return <FullSpin tip={i18n.t('驗證中...')} />;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired };
AuthProvider.defaultProps = {};

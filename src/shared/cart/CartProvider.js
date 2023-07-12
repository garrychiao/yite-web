import _ from 'lodash';
// import log from 'loglevel';
import { createContext, useMemo, useState, useEffect } from 'react';
// import { useBoolean, useMount, useMemoizedFn, useRequest } from 'ahooks';
import PropTypes from 'prop-types';

export const CartContext = createContext({
  cart: () => {},
  setCart: () => {},
  hasProduct: false,
});

export default function CartProvider({ children }) {
  
  const [cart, setCart] = useState([]);
  console.log(`cart.length`)
  console.log(cart.length)

  const hasProduct = useMemo(() => (cart.length > 0), [cart]);
  
  const contextValue = useMemo(
    () => ({ cart, setCart, hasProduct }),
    [cart, setCart, hasProduct]
  );

  // if (!isAuthReady) return <FullSpin tip={i18n.t('驗證中...')} />;

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

CartProvider.propTypes = { children: PropTypes.node.isRequired };
CartProvider.defaultProps = {};

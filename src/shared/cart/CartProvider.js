import _ from 'lodash';
// import log from 'loglevel';
import { createContext, useMemo, useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import PropTypes from 'prop-types';
import { cartApi } from 'page/api';

export const CartContext = createContext({
  cart: [],
  setCart: () => {},
  fetchCart: () => {},
  hasProduct: false,
});

export default function CartProvider({ children }) {
  
  const [cart, setCart] = useState([]);
  const hasProduct = useMemo(() => (cart.length > 0), [cart]);

  const {run: fetchCart} = useRequest(() => cartApi.list(), {
    onSuccess: (res) => {
      const data = res?.rows || [];
      setCart(data.map(item => ({
        ...item,
        unitPrice: item?.product?.customerPrice || item?.product?.defaultPrice,
        defaultPrice: item?.product?.defaultPrice,
      })));
    },
  })
  
  const contextValue = useMemo(
    () => ({ cart, setCart, fetchCart, hasProduct }),
    [cart, setCart, fetchCart, hasProduct]
  );

  // if (!isAuthReady) return <FullSpin tip={i18n.t('驗證中...')} />;

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

CartProvider.propTypes = { children: PropTypes.node.isRequired };
CartProvider.defaultProps = {};

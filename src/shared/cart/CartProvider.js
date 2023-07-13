import _ from 'lodash';
// import log from 'loglevel';
import { createContext, useMemo, useState, useEffect, useCallback } from 'react';
import { useRequest } from 'ahooks';
import PropTypes from 'prop-types';
import { cartApi } from 'page/api';
import { useAuthUser } from 'react-auth-kit';

export const CartContext = createContext({
  cart: [],
  setCart: () => { },
  fetchCart: () => { },
  selectedItems: [],
  setSelectedItems: () => { },
  hasProduct: false,
  onSelectAll: () => { },
  addSelectedItem: () => { },
  removeSelectedItem: () => { },
});

export default function CartProvider({ children }) {

  const auth = useAuthUser();
  const user = auth();

  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const hasProduct = useMemo(() => (cart.length > 0), [cart]);

  const { run: fetchCart } = useRequest(() => cartApi.list(), {
    ready: !!user,
    onSuccess: (res) => {
      const data = res?.rows || [];
      const resCart = data.map(item => ({
        ...item,
        unitPrice: item?.product?.customerPrice || item?.product?.defaultPrice,
        defaultPrice: item?.product?.defaultPrice,
      }))
      setCart(resCart);

      if (selectedItems.length > res.count) {
        setSelectedItems(resCart)
      }
    },
  })

  const onSelectAll = useCallback (() => {
    setSelectedItems(cart);
  }, [cart])

  const addSelectedItem = useCallback((id) => {
    const target = _.find(cart, { id });
    const alreadySelected = _.find(selectedItems, { id });
    if (!alreadySelected) {
      setSelectedItems([target, ...selectedItems]);
    }
  }, [cart, selectedItems])

  const removeSelectedItem = useCallback((id) => {
    setSelectedItems(_.filter(selectedItems, (item) => item.id !== id ));
  }, [selectedItems])


  const contextValue = useMemo(
    () => ({ cart, selectedItems, setCart, setSelectedItems, fetchCart, hasProduct, onSelectAll, addSelectedItem, removeSelectedItem }),
    [cart, selectedItems, setCart, setSelectedItems, fetchCart, hasProduct, onSelectAll, addSelectedItem, removeSelectedItem]
  );

  // if (!isAuthReady) return <FullSpin tip={i18n.t('驗證中...')} />;

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

CartProvider.propTypes = { children: PropTypes.node.isRequired };
CartProvider.defaultProps = {};

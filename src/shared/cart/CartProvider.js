import _ from 'lodash';
// import log from 'loglevel';
import { createContext, useMemo, useState, useEffect, useCallback } from 'react';
import { useRequest } from 'ahooks';
import PropTypes from 'prop-types';
import { cartApi, productApi } from 'page/api';
import { useAuthUser } from 'react-auth-kit';

export const CartContext = createContext({
  cart: [],
  setCart: () => { },
  fetchCart: () => { },
  selectedItems: [],
  setSelectedItems: () => { },
  hasProduct: false,
  // onSelectAll: () => { },
  // addSelectedItem: () => { },
  // removeSelectedItem: () => { },
  addSelectedToLocal: () => { },
  getSelectedFromLocal: () => { },
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
      // console.log(data)
      const resCart = data.map(item => ({
        ...item,
        unitPrice: item?.product?.customerPrice?.price || item?.product?.defaultPrice,
        defaultPrice: item?.product?.defaultPrice,
        currentModelNo: item?.selectedProductSpecs.length ? item?.selectedProductSpecs[0]?.modelNo : item?.product?.modelNo,
      }))
      console.log(resCart)
      setCart([...resCart]);

      if (selectedItems.length > res.count) {
        setSelectedItems(resCart)
      }
    },
  })

  // const onSelectAll = useCallback(() => {
  //   setSelectedItems(cart.map(item => item.id));
  // }, [cart])

  // const addSelectedItem = useCallback((id) => {
  //   const target = _.find(cart, { id });
  //   const others = _.filter(selectedItems, (item) => item.id !== id );
  //   setSelectedItems([...others, target]);
  // }, [cart, selectedItems])

  // const removeSelectedItem = useCallback((id) => {
  //   setSelectedItems(_.filter(selectedItems, (item) => item.id !== id));
  // }, [selectedItems])

  const addSelectedToLocal = useCallback(() => {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  }, [selectedItems])

  const getSelectedFromLocal = useCallback(() => {
    const idList = JSON.parse(localStorage.getItem('selectedItems'));
    // const selectedItems = _.filter(cart, (item) => idList.indexOf(item.id) > -1);
    return idList
  }, [])


  const contextValue = useMemo(
    () => ({
      cart,
      selectedItems,
      setCart,
      setSelectedItems,
      fetchCart,
      hasProduct,
      // onSelectAll,
      // addSelectedItem,
      // removeSelectedItem,
      addSelectedToLocal,
      getSelectedFromLocal
    }),
    [
      cart,
      selectedItems,
      setCart,
      setSelectedItems,
      fetchCart,
      hasProduct,
      // onSelectAll,
      // addSelectedItem,
      // removeSelectedItem,
      addSelectedToLocal,
      getSelectedFromLocal]
  );

  // if (!isAuthReady) return <FullSpin tip={i18n.t('驗證中...')} />;

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

CartProvider.propTypes = { children: PropTypes.node.isRequired };
CartProvider.defaultProps = {};

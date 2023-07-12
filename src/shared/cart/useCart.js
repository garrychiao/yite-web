import { useContext } from 'react';
import { CartContext } from './CartProvider';

export default function useAuth() {
  return useContext(CartContext);
}

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '@/types/product';

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; size: string; color: string } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; size: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, size, color } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product._id === product._id && item.size === size && item.color === color
      );

      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity, size, color }];
      }

      const newTotal = newItems.reduce((sum, item) => sum + (item.product.discountedPrice * item.quantity), 0);
      return { items: newItems, total: newTotal };
    }

    case 'REMOVE_FROM_CART': {
      const { productId, size, color } = action.payload;
      const newItems = state.items.filter(
        item => !(item.product._id === productId && item.size === size && item.color === color)
      );
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.discountedPrice * item.quantity), 0);
      return { items: newItems, total: newTotal };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, size, color, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: { productId, size, color } });
      }

      const newItems = state.items.map(item =>
        item.product._id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      );
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.discountedPrice * item.quantity), 0);
      return { items: newItems, total: newTotal };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0 };

    case 'LOAD_CART': {
      const newTotal = action.payload.reduce((sum, item) => sum + (item.product.discountedPrice * item.quantity), 0);
      return { items: action.payload, total: newTotal };
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, size, color } });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    console.log(productId,size,color,"2")
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, size, color } });
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, color, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemCount = () => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
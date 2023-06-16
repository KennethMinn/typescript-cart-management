import { Product } from './../../Routes/Home';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface initialState {
  readonly products: Product[];
  readonly isLoading: boolean;
  readonly filteredProducts: Product[];
  readonly cartItems: Product[];
  readonly screenSize: number;
  readonly isPhone: boolean;
}

const INITIAL_STATE: initialState = {
  products: [],
  isLoading: false,
  filteredProducts: [],
  cartItems: [],
  screenSize: window.innerWidth,
  isPhone: true,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState: INITIAL_STATE,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setFilteredProducts(state, action: PayloadAction<Product[]>) {
      state.filteredProducts = action.payload;
    },
    addItemToCart(state, action: PayloadAction<Product>) {
      const isExisted = state.cartItems?.find(
        (cart: Product) => cart?.id === action.payload.id
      );

      if (isExisted)
        state.cartItems = state.cartItems.map((cart: Product) =>
          cart.id === action.payload.id
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart
        );
      else {
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload, quantity: 1 },
        ];
      }
    },
    removeItemFromCart(state, action: PayloadAction<Product>) {
      state.cartItems = state.cartItems.filter(
        (cart: Product) => cart.id !== action.payload.id
      );
    },
    increaseQuantity(state, action: PayloadAction<Product>) {
      state.cartItems = state.cartItems.map(cart => {
        if (cart.id === action.payload.id)
          return { ...cart, quantity: cart.quantity + 1 };
        return cart;
      });
    },
    decreaseQuantity(state, action: PayloadAction<Product>) {
      state.cartItems = state.cartItems.map(cart => {
        if (cart.id === action.payload.id)
          return { ...cart, quantity: cart.quantity - 1 };
        return cart;
      });
      if (action.payload.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          cart => cart.id !== action.payload.id
        );
      }
    },
    setScreenSize(state, action: PayloadAction<number>) {
      state.screenSize = action.payload;
    },
    setIsPhone(state, action: PayloadAction<boolean>) {
      state.isPhone = action.payload;
    },
  },
});

export const productsReducer = productsSlice.reducer;
export const {
  setProducts,
  setIsLoading,
  setFilteredProducts,
  addItemToCart,
  removeItemFromCart,
  setScreenSize,
  setIsPhone,
  increaseQuantity,
  decreaseQuantity,
} = productsSlice.actions;

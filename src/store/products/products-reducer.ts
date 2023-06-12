import { Product } from './../../Routes/Home';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface initialState {
  readonly products: Product[];
  readonly isLoading: boolean;
  readonly filteredProducts: Product[];
  readonly cartItems: Product[];
  readonly isAdded: boolean;
}

const INITIAL_STATE: initialState = {
  products: [],
  isLoading: false,
  filteredProducts: [],
  cartItems: [],
  isAdded: false,
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
        state.cartItems = state.cartItems.map((cart: Product) => cart);
      else state.cartItems = [...state.cartItems, action.payload];
    },
    removeItemFromCart(state, action: PayloadAction<Product>) {
      state.cartItems = state.cartItems.filter(
        (cart: Product) => cart.id !== action.payload.id
      );
    },
    setIsAdded(state, action: PayloadAction<boolean>) {
      state.isAdded = action.payload;
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
  setIsAdded,
} = productsSlice.actions;

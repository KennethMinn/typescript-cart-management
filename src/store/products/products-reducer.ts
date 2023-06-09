import { Product } from './../../Routes/Home';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface initialState {
  readonly products: Product[];
  readonly isLoading: boolean;
  readonly filteredProducts: Product[];
}

const INITIAL_STATE: initialState = {
  products: [],
  isLoading: false,
  filteredProducts: [],
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
  },
});

export const productsReducer = productsSlice.reducer;
export const { setProducts, setIsLoading, setFilteredProducts } =
  productsSlice.actions;

import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectProductsReducer = (state: RootState) => state.products;

export const selectProducts = createSelector(
  [selectProductsReducer],
  products => products.products
);

export const selectIsLoading = createSelector(
  [selectProductsReducer],
  products => products.isLoading
);

export const selectFilteredProducts = createSelector(
  [selectProductsReducer],
  products => products.filteredProducts
);

export const selectCartItems = createSelector(
  [selectProductsReducer],
  products => products.cartItems
);

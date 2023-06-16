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

export const selectScreenSize = createSelector(
  [selectProductsReducer],
  products => products.screenSize
);

export const selectIsPhone = createSelector(
  [selectProductsReducer],
  products => products.isPhone
);

export const selectTotal = createSelector(
  [selectProductsReducer],
  products => products.total
);

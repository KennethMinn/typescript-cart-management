import { createSelector } from 'reselect';

const selectProductsReducer = state => state.products;

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

export const selectIsAdded = createSelector(
  [selectProductsReducer],
  products => products.isAdded
);

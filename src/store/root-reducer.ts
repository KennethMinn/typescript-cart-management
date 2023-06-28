import { combineReducers } from '@reduxjs/toolkit';
import { productsReducer } from './products/products-reducer';
import { searchReducer } from './searchField/search-field-reducer';
import { categoriesReducer } from './categories/categories-reducer';
import { userReducer } from './users/user-reducer';

export const rootReducer = combineReducers({
  products: productsReducer,
  search: searchReducer,
  categories: categoriesReducer,
  user: userReducer,
});

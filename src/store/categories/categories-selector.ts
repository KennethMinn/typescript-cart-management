import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectCategoriesReducer = (state: RootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  categories => categories.categories
);

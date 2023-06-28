import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectSearchReducer = (state: RootState) => state.search;

export const selectSearchField = createSelector(
  [selectSearchReducer],
  search => search.searchField
);

export const selectActive = createSelector(
  [selectSearchReducer],
  search => search.active
);

export const selectIsDropDownOpen = createSelector(
  [selectSearchReducer],
  search => search.isDropDownOpen
);

import { createSelector } from 'reselect';

const selectSearchReducer = state => state.search;

export const selectSearchField = createSelector(
  [selectSearchReducer],
  search => search.searchField
);

export const selectActive = createSelector(
  [selectSearchReducer],
  search => search.active
);

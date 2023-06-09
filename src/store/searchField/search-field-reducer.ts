import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface initialState {
  readonly searchField: string;
  readonly active: string;
}

const INITIAL_STATE: initialState = {
  searchField: '',
  active: 'All',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: INITIAL_STATE,
  reducers: {
    setSearchField(state, action: PayloadAction<string>) {
      state.searchField = action.payload;
    },
    setActive(state, action: PayloadAction<string>) {
      state.active = action.payload;
    },
  },
});

export const { setSearchField, setActive } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

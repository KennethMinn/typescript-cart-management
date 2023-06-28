import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface initialState {
  readonly searchField: string;
  readonly active: string;
  readonly isDropDownOpen: boolean;
}

const INITIAL_STATE: initialState = {
  searchField: '',
  active: 'All',
  isDropDownOpen: false,
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
    setIsDropDownOpen(state, action: PayloadAction<boolean>) {
      state.isDropDownOpen = action.payload;
    },
  },
});

export const { setSearchField, setActive, setIsDropDownOpen } =
  searchSlice.actions;
export const searchReducer = searchSlice.reducer;

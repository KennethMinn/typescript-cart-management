import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface initialState {
  categories: string[];
}

const INITIAL_STATE: initialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: INITIAL_STATE,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;

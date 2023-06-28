import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IinitialState {
  user: string;
}

const initialState: IinitialState = {
  user: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

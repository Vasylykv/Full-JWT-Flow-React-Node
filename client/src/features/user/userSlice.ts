import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../models/IUser';
import { checkAuth, login, logout, registration } from './operations';

export interface UserState {
  user: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registration.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
    });
    builder.addCase(registration.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.user = initialState.user;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;

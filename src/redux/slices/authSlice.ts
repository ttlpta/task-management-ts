import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequestForm, AuthToken, RejectThunk } from '../../type/api';
import { AuthState, CurrentUser, StatusStateENUM } from '../../type/model';
import asyncThunkWrapper from '../asyncThunkWrapper';
import { loginService, getCurrentUserService } from '../../services/AuthService';
import { RootState } from '../store';

export const login = createAsyncThunk<AuthToken, LoginRequestForm, RejectThunk>(
  'auth/login',
  asyncThunkWrapper(loginService),
);

export const getCurrentUser = createAsyncThunk<CurrentUser, undefined, RejectThunk>(
  'auth/getCurrentUser',
  asyncThunkWrapper(getCurrentUserService),
);

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  error: '',
  currentUser: {} as CurrentUser,
  status: StatusStateENUM.IDLE,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = StatusStateENUM.LOADING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = StatusStateENUM.SUCCEEDED;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload?.refreshToken;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = StatusStateENUM.FAILED;
      state.error = action.payload?.message;
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.status = StatusStateENUM.LOADING;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.status = StatusStateENUM.SUCCEEDED;
      state.currentUser = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.status = StatusStateENUM.FAILED;
      state.error = action.payload?.message;
    });
  },
});
export const { logout } = authSlice.actions;

export const authState = (state: RootState) => state.auth;

export default authSlice.reducer;

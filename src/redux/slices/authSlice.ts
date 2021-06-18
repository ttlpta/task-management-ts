import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { axiosAuth } from "../../axios";
import { STATUS } from "../../config";
import {
  LoginRequestForm,
  LoginResponse,
  RejectThunk,
  APIFunc,
} from "../../type/api";
import asyncThunkWrapper from "../asyncThunkWrapper";

const loginAPI: APIFunc<LoginRequestForm> = ({ body }) =>
  axios.post("/auth/login", body);

export const login = createAsyncThunk<
  LoginResponse,
  LoginRequestForm,
  RejectThunk
>("auth/login", asyncThunkWrapper(loginAPI));

const getCurrentUserAPI: APIFunc<null> = ({ accessToken }) =>
  axiosAuth(accessToken).get("/users/me");

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  asyncThunkWrapper(getCurrentUserAPI)
);

const initialState = {
  accessToken: "",
  refreshToken: "",
  currentUser: {},
  status: STATUS.IDLE,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  // extraReducers: {
  //   [login.pending]: (state) => {
  //     state.status = STATUS.LOADING;
  //   },
  //   [login.fulfilled]: (state, action) => {
  //     state.status = STATUS.SUCCEEDED;
  //     state.accessToken = action.payload.accessToken;
  //     state.refreshToken = action.payload?.refreshToken;
  //   },
  //   [login.rejected]: (state, action) => {
  //     state.status = STATUS.FAILED;
  //     state.error = action.message;
  //   },
  //   [getCurrentUser.fulfilled]: (state, action) => {
  //     state.status = STATUS.SUCCEEDED;
  //     state.currentUser = action.payload;
  //   },
  //   [getCurrentUser.rejected]: (state, action) => {
  //     state.status = STATUS.FAILED;
  //     state.error = action.message;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = STATUS.SUCCEEDED;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload?.refreshToken;
    });
  }
});
export const { logout } = authSlice.actions;

export const authState = (state) => state.auth;

export default authSlice.reducer;

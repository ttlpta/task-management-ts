import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RejectThunk } from '../../type/api';

import asyncThunkWrapper from '../asyncThunkWrapper';
import { getMenuItemsService } from '../../services/UIService';
import { MenuItem, StatusStateENUM, UIState } from '../../type/model';
import { RootState } from '../store';

export const getMenuItems = createAsyncThunk<
MenuItem[],
undefined,
RejectThunk
>('auth/getMenuItems', asyncThunkWrapper(getMenuItemsService));

const initialState: UIState = {
  alert: {
    show: false,
    message: '',
    type: 'success',
  },
  drawer: {
    list: [],
    open: false,
    status: StatusStateENUM.IDLE,
  },
};
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showAlert(state, action) {
      state.alert = action.payload;
    },
    toggleDrawer(state) {
      state.drawer.open = !state.drawer.open;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMenuItems.pending, (state) => {
      state.drawer.status = StatusStateENUM.LOADING;
    });
    builder.addCase(getMenuItems.fulfilled, (state, action) => {
      state.drawer.status = StatusStateENUM.SUCCEEDED;
      state.drawer.list = action.payload;
    });
    builder.addCase(getMenuItems.rejected, (state, action) => {
      state.drawer.status = StatusStateENUM.FAILED;
      state.error = action.payload?.message;
    });
  },
});

export const { showAlert, toggleDrawer } = uiSlice.actions;

export const uiAlertState = (state: RootState) => state.ui.alert;
export const uiDrawerState = (state: RootState) => state.ui.drawer;

export default uiSlice.reducer;

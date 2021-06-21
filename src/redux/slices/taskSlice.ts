import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import taskAdapter from '../entities/task';
import asyncThunkWrapper from '../asyncThunkWrapper';
import {
  createTaskService,
  getTaskService,
  getTasksService,
  updateTaskService,
} from '../../services/TaskService';
import {
  CreateTaskRequestForm,
  RejectThunk,
  UpdateTaskRequestForm,
} from '../../type/api';
import { StatusStateENUM, Task } from '../../type/model';
import { RootState } from '../store';

export const getTasks = createAsyncThunk<Task[], undefined, RejectThunk>(
  'tasks/getList',
  asyncThunkWrapper(getTasksService),
);

export const createTask = createAsyncThunk<
Task,
CreateTaskRequestForm,
RejectThunk
>('tasks/createTask', asyncThunkWrapper(createTaskService));

export const updateTask = createAsyncThunk<
Task,
UpdateTaskRequestForm,
RejectThunk
>('tasks/updateTask', asyncThunkWrapper(updateTaskService));

export const getTaskById = createAsyncThunk<Task, number, RejectThunk>(
  'tasks/getTaskById',
  asyncThunkWrapper(getTaskService),
);

const initialState = taskAdapter.getInitialState<{
  status: StatusStateENUM;
  error: string | undefined;
}>({
  status: StatusStateENUM.IDLE,
  error: '',
});

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.status = StatusStateENUM.LOADING;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.status = StatusStateENUM.SUCCEEDED;
      taskAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.status = StatusStateENUM.FAILED;
      state.error = action.payload?.message;
    });

    builder.addCase(createTask.pending, (state) => {
      state.status = StatusStateENUM.LOADING;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.status = StatusStateENUM.SUCCEEDED;
      taskAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.status = StatusStateENUM.FAILED;
      state.error = action.payload?.message;
    });
    builder.addCase(getTaskById.pending, (state) => {
      state.status = StatusStateENUM.LOADING;
    });
    builder.addCase(getTaskById.fulfilled, (state) => {
      state.status = StatusStateENUM.SUCCEEDED;
    });
    builder.addCase(getTaskById.rejected, (state, action) => {
      state.status = StatusStateENUM.FAILED;
      state.error = action.payload?.message;
    });
    builder.addCase(updateTask.pending, (state) => {
      state.status = StatusStateENUM.LOADING;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.status = StatusStateENUM.SUCCEEDED;
      taskAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.status = StatusStateENUM.FAILED;
      state.error = action.payload?.message;
    });
  },
});
export const taskState = (state: RootState) => state.task;
export const taskStatus = (state: RootState) => state.task.status;
export const {
  selectById: selectTaskById,
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectTotal: selectTotalTasks,
} = taskAdapter.getSelectors((state: RootState) => state.task);

export default taskSlice.reducer;

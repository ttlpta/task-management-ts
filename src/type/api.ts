import { AxiosResponse } from 'axios';
import { Task } from './model';

export type APIFunc<T> = (data: { // eslint-disable-line no-unused-vars
  body: T | undefined;
  accessToken?: string;
}) => AxiosResponse | any | void;

export type LoginRequestForm = {
  username: string;
  password: string;
  isRememberMe: boolean;
};

export type CreateTaskRequestForm = Pick<Task, 'name' | 'authorID' | 'ownerId' | 'categoryId' | 'description'>;

export type UpdateTaskRequestForm = CreateTaskRequestForm & {
  id: number
};

export type AuthToken = {
  accessToken: string;
  refreshToken?: string;
};

export type CommonError = {
  message: string;
};

export type RejectThunk = {
  rejectValue: CommonError;
};

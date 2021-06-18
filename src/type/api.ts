import { AxiosResponse } from "axios";
export type APIFunc<T> = (data: {
  body: T;
  accessToken?: string;
}) => AxiosResponse | any | void;

export type LoginRequestForm = {
  username: string;
  password: string;
  isRememberMe: boolean;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type CommonError = {
  message: string;
};

export type RejectThunk = {
  rejectValue: CommonError;
};

export type GetCurrentUserRequest = {};

export type CurrentUser = {
  id: number;
  name: string;
};

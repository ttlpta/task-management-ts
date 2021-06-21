import axios, { axiosAuth } from '../axios';
import { LoginRequestForm, APIFunc } from '../type/api';

export const loginService: APIFunc<LoginRequestForm> = ({ body }) => axios.post('/auth/login', body);

export const getCurrentUserService: APIFunc<{}> = ({ accessToken }) => axiosAuth(accessToken).get('/users/me');

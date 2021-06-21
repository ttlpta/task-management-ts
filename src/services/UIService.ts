import { axiosAuth } from '../axios';
import { APIFunc } from '../type/api';

export const getMenuItemsService: APIFunc<{}> = ({ accessToken }) => axiosAuth(accessToken).get('/auth/getMenuItems');

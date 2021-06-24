import { APIFunc, CommonError } from '../type/api';
import { RootState } from './store';

const wrapper =
  (API: APIFunc<any>) =>
  async (body = {}, { rejectWithValue, getState }: any) => {
    try {
      const {
        auth: { accessToken },
      }: RootState = getState();
      const { data } = await API({ body, accessToken });

      return data;
    } catch (error) {
      const errorData = error.response.data;
      if (errorData.statusCode === 401) {
        window.location.href = '/logout';
      }
      return rejectWithValue(error.response.data as CommonError);
    }
  };

export default wrapper;

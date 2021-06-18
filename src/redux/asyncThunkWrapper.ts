import { APIFunc } from "../type/api";

const wrapper =
  (API: APIFunc<any>) =>
  async (body = {}, { rejectWithValue, getState }: any) => {
    try {
      const {
        auth: { accessToken },
      } = getState();
      const { data } = await API({body, accessToken});

      return data;
    } catch (error) {
      const errorData = error.response.data;
      if (errorData.statusCode === 401) {
        window.location.href = "/logout";
      }
      return rejectWithValue(error.response.data);
    }
  };

export default wrapper;

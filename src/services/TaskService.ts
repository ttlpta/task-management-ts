import { axiosAuth } from "../axios";
import {
  APIFunc,
  CreateTaskRequestForm,
  UpdateTaskRequestForm,
} from "../type/api";

export const getTasksService: APIFunc<{}> = ({ accessToken }) =>
  axiosAuth(accessToken).get("/tasks");

export const createTaskService: APIFunc<CreateTaskRequestForm> = ({
  body,
  accessToken,
}) => axiosAuth(accessToken).post("/tasks", body);

export const updateTaskService: APIFunc<UpdateTaskRequestForm> = ({
  body,
  accessToken,
}) =>
  axiosAuth(accessToken).patch(
    `/tasks/${(body as UpdateTaskRequestForm).id}`,
    body
  );

export const getTaskService: APIFunc<number> = ({
  body: id,
  accessToken,
}) => axiosAuth(accessToken).get(`/tasks/${id}`);

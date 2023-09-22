import { Auth } from "aws-amplify";
import axios from "axios";

const http = axios.create({
  baseURL: "/api",
  timeout: 10_000,
});

http.interceptors.request.use(async (config) => {
  const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export const api = {
  get: <T>(url: string, params?: object) =>
    http.get<T>(url, {
      ...params,
    }),
  post: <T>(url: string, data: any) => http.post<T>(url, data, {}),
  put: <T>(url: string, data: any) => http.put<T>(url, data, {}),
  delete: <T>(url: string) => http.delete<T>(url, {}),
};

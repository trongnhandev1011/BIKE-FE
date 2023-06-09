import axiosClient from "@services/backend/axiosClient";
import axios from "axios";
import { User } from "src/types";
import { Response } from "src/types/Response.type";
import { IAuth } from "./type";

export function loginAPI(props: { email: string; password: string }) {
  const { email, password } = props;
  return axios.post<Response<IAuth>>(
    "http://52.74.214.224:8080/api/v1/auth/login",
    {
      username: email,
      password,
    }
  );
}

export function getAuthenticatedUserAPI() {
  return axiosClient.get<Response<User>>(
    "http://52.74.214.224:8080/api/v1/users/me"
  );
}

export function refreshTokenAPI(refreshToken: string) {
  return axios.post<Response<IAuth>>(
    "http://52.74.214.224:8080/api/v1/auth/refresh",
    {
      refreshToken,
    }
  );
}

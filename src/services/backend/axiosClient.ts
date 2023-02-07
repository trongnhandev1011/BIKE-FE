import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { refreshTokenAPI } from "./AuthController";
import Cookies from "js-cookie";

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

const axiosClient = axios.create({
  baseURL: DEFAULT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//set client base URL again
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    if (error?.response?.status === 401) {
      if (!originalRequest?.retry) {
        originalRequest.retry = true;
        const access_token = await refreshToken();
        setAuthToken(access_token as string);
        axiosClient.defaults.headers.common["Authorization"] =
          "Bearer " + access_token;
        originalRequest.headers["Authorization"] = "Bearer " + access_token;
        return axios(originalRequest);
      } else {
        delete axiosClient.defaults.headers.common.Authorization;
      }
    }

    return Promise.reject(error);
  }
);

export const setAuthToken = (token?: string) => {
  if (token) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common.Authorization;
  }
};

// hàm để refresh token
const refreshToken = async () => {
  const refreshToken = Cookies.get(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string
  );
  if (!refreshToken) {
    return null;
  }
  try {
    const {
      data: { data },
    } = await refreshTokenAPI(refreshToken);
    console.log(data);
    Cookies.set(process.env.NEXT_PUBLIC_TOKEN_KEY as string, data.token);
    Cookies.set(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
      data.refreshToken
    );
    await setAuthToken(data.token);
    return data.token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default axiosClient;

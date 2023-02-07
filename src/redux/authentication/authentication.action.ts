import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  getAuthenticatedUserAPI,
  loginAPI,
} from "@services/backend/AuthController";
import { setAuthToken } from "@services/backend/axiosClient";

export const initializeAuth = createAsyncThunk<{ user: object }, void>(
  "auth/init",
  async (_, thunkAPI) => {
    try {
      //TODO: call refresh api later
      const token = Cookies.get(process.env.NEXT_PUBLIC_TOKEN_KEY as string);
      if (!token) throw new Error("Invalid token");
      setAuthToken(token);
      const {
        data: { data: userData },
      } = await getAuthenticatedUserAPI();
      return { user: userData };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<
  { user: object },
  { username: string; password: string }
>("auth/login", async ({ username, password }, thunkAPI) => {
  try {
    const {
      data: { data },
    } = await loginAPI({ email: username, password: password });
    setAuthToken(data.token);
    Cookies.set(process.env.NEXT_PUBLIC_TOKEN_KEY as string, data.token);
    Cookies.set(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
      data.refreshToken
    );
    const {
      data: { data: userData },
    } = await getAuthenticatedUserAPI();
    return { user: userData };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk<void, void>("auth/logout", () => {
  setAuthToken(undefined);
  Cookies.remove(process.env.NEXT_PUBLIC_TOKEN_KEY as string);
  localStorage.removeItem(process.env.NEXT_PUBLIC_USER_STORAGE as string);
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginAPI } from "@services/backend/authController";
import { setAuthToken } from "@services/backend/axiosClient";

export const login = createAsyncThunk<
  { user: object },
  { username: string; password: string }
>("auth/login", async ({ username, password }, thunkAPI) => {
  try {
    const { data } = await loginAPI({ email: username, password: password });
    setAuthToken(data.token);
    Cookies.set(process.env.NEXT_PUBLIC_TOKEN_KEY as string, data.token);
    localStorage.setItem(
      process.env.NEXT_PUBLIC_USER_STORAGE as string,
      JSON.stringify(data.user)
    );
    return { user: data.user };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk<void, void>("auth/logout", () => {
  setAuthToken(undefined);
  Cookies.remove(process.env.NEXT_PUBLIC_TOKEN_KEY as string);
  localStorage.removeItem(process.env.NEXT_PUBLIC_USER_STORAGE as string);
});

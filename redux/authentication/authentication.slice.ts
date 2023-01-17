import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import { login, logout } from "./authentication.action";

export type AuthenticationState = {
  isAuthUser: boolean;
  user: User | {};
  dataFetched: boolean;
  isFetching: boolean;
  error: boolean;
};

const initialState: AuthenticationState = {
  isAuthUser: false,
  user: {},
  dataFetched: false,
  isFetching: false,
  error: false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        isAuthUser: Object.keys(action.payload).length !== 0,
        user: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => ({
      isAuthUser: true,
      user: action.payload.user,
      isFetching: false,
      dataFetched: true,
      error: false,
    }));
    builder.addCase(login.pending, (state) => ({
      ...state,
      isFetching: true,
      dataFetched: false,
      error: false,
    }));
    builder.addCase(login.rejected, (state, action) => ({
      isAuthUser: false,
      user: {},
      isFetching: false,
      dataFetched: true,
      error: true,
    }));
    builder.addCase(logout.fulfilled, (state, action) => ({
      ...initialState,
      isAuthUser: false,
      user: {},
    }));
    builder.addCase(logout.rejected, (state, action) => ({
      ...initialState,
      isAuthUser: false,
      user: {},
    }));
  },
});

export const { setUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;

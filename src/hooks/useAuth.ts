import { useEffect } from "react";
import Router from "next/router";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { login, logout } from "@redux/authentication/authentication.action";

export default function useAuth({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const dispatch = useAppDispatch();
  const { user, isAuthUser } = useAppSelector((state) => state.authentication);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const loginHandler = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => dispatch(login({ username: email, password: password }));

  useEffect(() => {
    if (!redirectTo) return;

    if (
      (redirectTo && !redirectIfFound && !isAuthUser) ||
      (redirectIfFound && isAuthUser)
    ) {
      Router.push(redirectTo);
    }
  }, [isAuthUser, redirectIfFound, redirectTo, user]);

  return { user, isAuthUser, logout: logoutHandler, login: loginHandler };
}

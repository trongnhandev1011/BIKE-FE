import { useEffect } from "react";
import Router from "next/router";
import { useAppSelector } from "../redux/store";

export default function useAuth({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { user, isAuthUser } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    if (!redirectTo) return;

    if (
      (redirectTo && !redirectIfFound && !isAuthUser) ||
      (redirectIfFound && isAuthUser)
    ) {
      Router.push(redirectTo);
    }
  }, [isAuthUser, redirectIfFound, redirectTo, user]);

  return { user, isAuthUser };
}

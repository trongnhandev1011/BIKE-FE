import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { initializeAuth } from "../../redux/authentication/authentication.slice";
import { useAppDispatch } from "../../redux/store";

const authPage = ["/protected"];

export default function AuthProvider({ children }: { children: any }) {
  const dispatch = useAppDispatch();
  const { isAuthUser } = useAuth();
  const route = useRouter();

  useEffect(() => {
    //init when on client side
    dispatch(initializeAuth());
  }, []);

  useEffect(() => {
    if (
      !authPage.includes(route.pathname) ||
      (authPage.includes(route.pathname) && isAuthUser)
    ) {
      //ignore
    } else if (authPage.includes(route.pathname) && !isAuthUser) {
      route.push("/login");
    }
  }, [route.pathname, isAuthUser]);

  return <>{children}</>;
}
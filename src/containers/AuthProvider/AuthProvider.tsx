import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useAuth from "@hooks/useAuth";
import { useAppDispatch } from "@redux/store";
import { initializeAuth } from "@redux/authentication/authentication.action";

const authPage = ["/dashboard"];

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

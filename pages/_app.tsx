import "../styles/globals.css";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import axiosClient from "../services/axiosClient";
import "antd/dist/reset.css";
import store, { useAppDispatch } from "../redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../redux/authentication/authentication.slice";

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(
      localStorage.getItem(process.env.NEXT_PUBLIC_USER_STORAGE as string)
    );
    dispatch(
      setUser(
        JSON.parse(
          localStorage.getItem(
            process.env.NEXT_PUBLIC_USER_STORAGE as string
          ) as string
        ) || {}
      )
    );
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <MyApp {...props} />
    </Provider>
  );
}

import "../styles/globals.scss";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import { AuthProvider } from "../containers/AuthProvider";
import { fetcher } from "../utils/common";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <Provider store={store}>
      <AuthProvider>
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
      </AuthProvider>
    </Provider>
  );
}

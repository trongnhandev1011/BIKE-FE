import "@styles/globals.scss";
import "@components/SideNav/SideNav.style.scss";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import store from "@redux/store";
import { Provider } from "react-redux";
import { AuthProvider } from "@containers/AuthProvider";
import { fetcher } from "@utils/common";
import { WrapperLayout } from "@layouts/WrapperLayout";
import { NotificationProvider } from "@containers/NotificationProvider";
import { ErrorBoundary } from "@containers/ErrorBoundary";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <NotificationProvider>
            <SWRConfig
              value={{
                fetcher: fetcher,
                onError: (err) => {
                  console.error(err);
                },
                refreshInterval: 10000,
              }}
            >
              <WrapperLayout>
                <Component {...pageProps} />
              </WrapperLayout>
            </SWRConfig>
          </NotificationProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
}

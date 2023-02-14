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
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { notification } from "antd";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [lastPong, setLastPong] = useState(null);
  const count = useRef(0);

  useEffect(() => {
    const socket = new SockJS("http://52.74.214.224:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      console.log("connected");
      stompClient.subscribe(
        "/user/e7f506b0-2147-408c-ba9d-102e7a8f03be/notifications",
        (mess) => {
          count.current += 1;
          console.log(count.current);
          notification.info({
            //@ts-ignore
            message: JSON.parse(mess.body).title,
            //@ts-ignore
            description: JSON.parse(mess.body).body,
          });
        }
      );
    });
  }, []);

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
          <WrapperLayout>
            <Component {...pageProps} />
          </WrapperLayout>
        </SWRConfig>
      </AuthProvider>
    </Provider>
  );
}

function NotificationProvider({ children }: { children: any }) {
  return <>{children()}</>;
}

import useAuth from "@hooks/useAuth";
import { Stomp } from "@stomp/stompjs";
import { notification } from "antd";
import { useEffect } from "react";
import SockJS from "sockjs-client";

export default function NotificationProvider({ children }: { children: any }) {
  const { user } = useAuth();

  useEffect(() => {
    const socket = new SockJS("http://52.74.214.224:8080/ws");
    const stompClient = Stomp.over(() => socket); //for reload
    stompClient.debug = () => {}; //prevent console output
    if (user?.id) {
      stompClient.connect({}, () => {
        stompClient.subscribe(`/user/${user?.id}/notifications`, (mess) => {
          const messBody = JSON.parse(mess.body);
          notification.info({
            message: messBody?.title,
            description: messBody?.body,
          });
        });
      });
    }

    return () => stompClient.disconnect();
  }, [user]);

  return <>{children}</>;
}

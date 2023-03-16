import useAuth from "@hooks/useAuth";
import { Stomp } from "@stomp/stompjs";
import { Button, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SockJS from "sockjs-client";

export const actionToID = {
  OPEN_VEHICLE: "VEHICLE_REQUEST_MANAGEMENT",
};

export default function NotificationProvider({ children }: { children: any }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const socket = new SockJS("http://52.74.214.224:8080/ws");
    const stompClient = Stomp.over(socket);
    if (user?.id) {
      console.log(user?.id);
      stompClient.connect({}, () => {
        stompClient.subscribe(`/user/${user?.id}/notifications`, (mess) => {
          const messBody = JSON.parse(mess.body);
          const redirectPath =
            actionToID[messBody?.action as keyof typeof actionToID];

          notification.info({
            message: messBody?.title,
            description: messBody?.body,
            btn: redirectPath && (
              <Button
                type="primary"
                onClick={() => {
                  router.push({
                    pathname: "/dashboard",
                    query: {
                      tab: redirectPath,
                    },
                  });
                }}
              >
                Redirect to
              </Button>
            ),
          });
        });
      });
    }

    return () => stompClient.disconnect();
  }, [user]);

  return <>{children}</>;
}

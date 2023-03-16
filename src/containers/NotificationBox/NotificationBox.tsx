import { NotificationBoxComponent } from "@components/NotificationBox";
import { Notification } from "src/types/notification";
import { PaginationResponse } from "src/types/Response.type";
import useSWR from "swr";

const NotificationBox = () => {
  const { data: response } = useSWR<PaginationResponse<Notification>>({
    url: "http://52.74.214.224:8080/api/v1/notifications",
    args: { page: "1", pageSize: "200" },
  });

  return (
    <div>
      <NotificationBoxComponent notificationList={response?.data.items || []} />
    </div>
  );
};

export default NotificationBox;

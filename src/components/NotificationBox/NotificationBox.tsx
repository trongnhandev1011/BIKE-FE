import { BellFilled, BellOutlined } from "@ant-design/icons";
import { stringToReadableGMT } from "@utils/datetime";
import { Button, Dropdown, MenuProps, notification, Space } from "antd";
import { Notification } from "src/types/notification";

const NotificationBox = ({
  notificationList,
}: {
  notificationList: Notification[];
}) => {
  return (
    <div>
      <Dropdown
        menu={{
          items: notificationList.map((notification) => ({
            key: notification.id,
            label: (
              <div className="max-w-[20rem] flex p-2 items-center">
                <BellOutlined className="text-2xl text-blue-300" />
                <div className="ml-3">
                  <div className="text-lg font-bold">{notification.title}</div>
                  <div className="truncate max-w-[18rem]">
                    {notification.body}
                  </div>
                  <div>{stringToReadableGMT(notification.time)}</div>
                </div>
              </div>
            ),
          })),
        }}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
        trigger={["click"]}
        destroyPopupOnHide={true}
      >
        <a onClick={(e) => e.preventDefault()}>
          <BellFilled className="text-2xl" />
        </a>
      </Dropdown>
    </div>
  );
};

export default NotificationBox;

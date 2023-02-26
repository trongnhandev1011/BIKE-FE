import { Menu, Typography, Layout, theme, MenuProps, Avatar } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Sider } = Layout;

export default function SideNav({
  navElements,
  onClick,
  logoutHandler,
}: {
  navElements: any;
  onClick: MenuProps["onClick"];
  logoutHandler: any;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Sider
        style={{
          background: colorBgContainer,
          borderRadius: 20,
          width: "fit-content",
          height: "fit-content",
        }}
        width={230}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <Typography.Title level={2}>Bike</Typography.Title>
          <Avatar
            src="https://nubiapage.com/wp-content/uploads/3008_australian-11.jpg"
            size={100}
            shape="circle"
          />
          <Typography.Title
            className="mt-2"
            level={4}
            style={{ color: "#656565" }}
          >
            Welcome
          </Typography.Title>
          <div>Admin name</div>
          <div className="rectangle-divider mt-4"> </div>
        </div>
        <Menu
          className="left-side-menu mt-5"
          onClick={onClick}
          mode="inline"
          defaultSelectedKeys={navElements[0].key}
          style={{ height: "100%" }}
          items={navElements}
        />
        <div className="flex justify-center items-center flex-col">
          <div className="rectangle-divider" style={{ marginTop: "50%" }}></div>
          <div
            className="flex justify-center items-center my-3"
            style={{ cursor: "pointer" }}
            onClick={() => logoutHandler()}
          >
            <LogoutOutlined style={{ fontSize: 16 }} />
            <div style={{ fontSize: 16 }} className="ml-1">
              Logout
            </div>
          </div>
        </div>
      </Sider>
    </>
  );
}

import { Menu, Button, Layout, theme } from "antd";

const { Sider } = Layout;

export default function SideNav({ navElements }: { navElements: any }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Sider style={{ background: colorBgContainer }} width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
          items={navElements}
        />
      </Sider>
    </>
  );
}

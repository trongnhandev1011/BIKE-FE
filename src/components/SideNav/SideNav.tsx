import { Menu, Button, Layout, theme, MenuProps } from "antd";

const { Sider } = Layout;

export default function SideNav({
  navElements,
  onClick,
}: {
  navElements: any;
  onClick: MenuProps["onClick"];
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Sider style={{ background: colorBgContainer }} width={230}>
        <Menu
          onClick={onClick}
          mode="inline"
          defaultSelectedKeys={navElements[0].key}
          style={{ height: "100%" }}
          items={navElements}
        />
      </Sider>
    </>
  );
}

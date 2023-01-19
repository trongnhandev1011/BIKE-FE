import { Menu, Button, Layout } from "antd";
const { Header: AntdHeader } = Layout;

interface IHeaderProps {
  navElements: any;
  button: JSX.Element;
}

export default function Header({ navElements, button }: IHeaderProps) {
  return (
    <>
      <AntdHeader
        className="header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ flexGrow: 5 }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={navElements}
          />
        </div>
        <div>{button}</div>
      </AntdHeader>
    </>
  );
}

import React from "react";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import useAuth from "../../hooks/useAuth";
import "./DashboardLayout.module.scss";
import { SideNavContainer } from "../../containers/SideNav";

const { Header, Content, Footer, Sider } = Layout;

function DashboardLayout({
  children,
  navElements,
}: {
  children?: any;
  navElements: any;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100%" }}>
      <Content style={{ margin: "0 50px", height: "100%" }}>
        <Layout
          style={{
            marginTop: "24px",
            padding: "24px",
            background: colorBgContainer,
            height: "95%",
            borderRadius: "1rem",
          }}
        >
          <SideNavContainer navElements={navElements} />
          <Content>{children}</Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default DashboardLayout;

import React from "react";
import { Layout, theme } from "antd";
import styles from "./DashboardLayout.module.scss";
import { SideNavContainer } from "@containers/SideNav";

const { Content } = Layout;

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
    <Layout style={{ height: "calc(100vw - 64px)" }}>
      <div className="flex" style={{ height: "100%" }}>
        <Content
          className="layout-container"
          style={{ margin: "0 50px", height: "100%" }}
        >
          <Layout
            style={{
              marginTop: "24px",
              background: colorBgContainer,
              height: "95%",
              borderRadius: "1rem",
              width: "fit-content",
            }}
          >
            <SideNavContainer navElements={navElements} />
          </Layout>
        </Content>
        <div
          className="my-6 mr-10"
          style={{
            width: "calc(100vw)",
            borderRadius: 15,
          }}
        >
          {children}
        </div>
      </div>
    </Layout>
  );
}

export default DashboardLayout;

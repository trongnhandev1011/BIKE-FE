import { Layout } from "antd";
import React from "react";
import { HeaderContainer } from "../../containers/Header";

export default function WrapperLayout({ children }: { children?: any }) {
  return (
    <Layout style={{ height: "100vh" }}>
      <HeaderContainer />
      {children}
    </Layout>
  );
}

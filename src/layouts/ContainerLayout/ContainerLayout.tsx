import { Layout } from "antd";
import React from "react";

export default function ContainerLayout({ children }: { children?: any }) {
  return <Layout style={{ height: "100vh" }}>{children}</Layout>;
}

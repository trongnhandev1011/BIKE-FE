import { Layout } from "antd";
import React from "react";

export default function ContainerLayout({ children }: { children?: any }) {
  return <Layout style={{ height: "calc(100vh - 64px)" }}>{children}</Layout>;
}

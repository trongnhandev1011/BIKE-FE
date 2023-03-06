import { Layout } from "antd";
import React from "react";
import { useRouter } from "next/router";

export default function WrapperLayout({ children }: { children?: any }) {
  return <Layout>{children}</Layout>;
}

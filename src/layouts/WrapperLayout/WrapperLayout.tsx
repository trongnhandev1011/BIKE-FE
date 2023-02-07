import { Layout } from "antd";
import React from "react";
import { HeaderContainer } from "../../containers/Header";
import { useRouter } from "next/router";

export default function WrapperLayout({ children }: { children?: any }) {
  const { pathname } = useRouter();

  return (
    <Layout>
      {pathname !== "/dashboard" ? <HeaderContainer /> : null}
      {children}
    </Layout>
  );
}

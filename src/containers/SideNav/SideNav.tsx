import React, { useContext } from "react";
import { SideNavComponent } from "@components/SideNav";
import { SideNavContext } from "@pages/dashboard";
import { MenuProps } from "antd";
import useAuth from "@hooks/useAuth";
import { useRouter } from "next/router";

export default function SideNav({ navElements }: { navElements: any }) {
  const { setCurrentTabId } = useContext(SideNavContext);

  const handleClick: MenuProps["onClick"] = (e) => {
    setCurrentTabId(e.key);
  };

  const { logout } = useAuth();
  const router = useRouter();

  const logoutHandler = () => {
    logout();
    router.push("/");
  };

  return (
    <SideNavComponent
      navElements={navElements}
      onClick={handleClick}
      logoutHandler={logoutHandler}
    />
  );
}

import React, { useContext, useEffect } from "react";
import { SideNavComponent } from "@components/SideNav";
import { SideNavContext } from "@pages/dashboard";
import { MenuProps } from "antd";
import useAuth from "@hooks/useAuth";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

export default function SideNav({ navElements }: { navElements: any }) {
  const { currentTabId, setCurrentTabId } = useContext(SideNavContext);
  const { mutate } = useSWRConfig();

  const router = useRouter();

  router.events &&
    router.events.on(
      "routeChangeComplete",
      () => router.query.tab && setCurrentTabId(router.query.tab as string)
    );

  const handleClick: MenuProps["onClick"] = (e) => {
    setCurrentTabId(e.key);
  };
  const { logout } = useAuth();

  const logoutHandler = () => {
    logout();
    router.push("/");
  };

  return (
    <SideNavComponent
      navElements={navElements?.map((navElement: any) =>
        navElement?.children
          ? {
              ...navElement,
              children: navElement.children.map((child: any) => ({
                ...child,
                isSelected: child.key === currentTabId,
              })),
            }
          : {
              ...navElement,
              isSelected: navElement.key === currentTabId,
            }
      )}
      onClick={handleClick}
      logoutHandler={logoutHandler}
    />
  );
}

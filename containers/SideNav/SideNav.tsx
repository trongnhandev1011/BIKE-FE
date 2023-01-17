import React, { useContext } from "react";
import { SideNavComponent } from "../../components/SideNav";
import { SideNavContext } from "../../pages/dashboard";
import { MenuProps } from "antd";

export default function SideNav({ navElements }: { navElements: any }) {
  const { setCurrentTabId } = useContext(SideNavContext);

  const handleClick: MenuProps["onClick"] = (e) => {
    setCurrentTabId(e.key);
  };

  return <SideNavComponent navElements={navElements} onClick={handleClick} />;
}

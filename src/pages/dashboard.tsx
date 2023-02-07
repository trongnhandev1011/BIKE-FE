import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DashboardLayout } from "@layouts/DashboardLayout";
import { StationScreen } from "@containers/Screen";
import { DashboardContainer } from "@containers/Dashboard";

const navElements = [
  {
    key: "HOME",
    id: "HOME",
    icon: React.createElement(LaptopOutlined),
    label: `Home`,
  },
  {
    key: "APP_MANAGEMENT",
    id: "APP_MANAGEMENT",
    icon: React.createElement(NotificationOutlined),
    label: `App management`,
    children: [
      {
        key: "STATION_MANAGEMENT",
        id: "STATION_MANAGEMENT",
        label: `Station management`,
      },
    ],
  },
  {
    key: "USER_MANAGEMENT",
    id: "USER_MANAGEMENT",
    icon: React.createElement(UserOutlined),
    label: `User management`,
  },
];

const navContents: Record<string, JSX.Element> = {
  HOME: <DashboardContainer />,
  STATION_MANAGEMENT: <StationScreen />,
  USER_MANAGEMENT: (
    <div style={{ height: "calc(100vh - 64px)" }}>
      <h1>User management</h1>
    </div>
  ),
};

export const SideNavContext = React.createContext({
  currentTabId: Object.keys(navElements)[0],
  setCurrentTabId: (preState: string) => {},
});

const Protected: React.FC<{}> = () => {
  const [currentTabId, setCurrentTabId] = useState(navElements[0].key);

  return (
    <SideNavContext.Provider
      value={{ currentTabId: currentTabId, setCurrentTabId: setCurrentTabId }}
    >
      <DashboardLayout navElements={navElements}>
        {navContents[currentTabId]}
      </DashboardLayout>
    </SideNavContext.Provider>
  );
};

export default Protected;

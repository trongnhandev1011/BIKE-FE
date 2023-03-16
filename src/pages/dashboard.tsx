import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { DashboardLayout } from "@layouts/DashboardLayout";
import {
  StationScreen,
  TripScreen,
  UserScreen,
  VehicleRequestScreen,
} from "@containers/Screen";
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
      {
        key: "TRIP_MANAGEMENT",
        id: "TRIP_MANAGEMENT",
        label: `Trip management`,
      },
    ],
  },
  {
    key: "USER_MANAGEMENT",
    id: "USER_MANAGEMENT",
    icon: React.createElement(UserOutlined),
    label: `User management`,
  },
  {
    key: "VEHICLE_REQUEST_MANAGEMENT",
    id: "VEHICLE_REQUEST_MANAGEMENT",
    icon: React.createElement(CarOutlined),
    label: `Vehicle request management`,
  },
];

const navContents: Record<string, JSX.Element> = {
  HOME: <DashboardContainer />,
  STATION_MANAGEMENT: <StationScreen />,
  TRIP_MANAGEMENT: <TripScreen />,
  USER_MANAGEMENT: <UserScreen />,
  VEHICLE_REQUEST_MANAGEMENT: <VehicleRequestScreen />,
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

import { Button } from "antd";
import React from "react";
import useAuth from "../hooks/useAuth";
import { DashboardLayout } from "../layouts/DashboardLayout";

const Protected: React.FC<{}> = () => {
  const { logout } = useAuth();

  return <DashboardLayout></DashboardLayout>;
};

export default Protected;

import { Button } from "antd";
import React from "react";
import useAuth from "../hooks/useAuth";
import { logout } from "../redux/authentication/authentication.action";
import { useAppDispatch } from "../redux/store";

const Protected: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthUser } = useAuth({
    redirectTo: "/login",
  });

  console.log(isAuthUser);

  return (
    <div>
      <h1>Protected</h1>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </div>
  );
};

export default Protected;

import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axiosClient, { setAuthToken } from "../services/axiosClient";
import { AxiosError } from "axios";
import { useAppDispatch } from "../redux/store";
import { login } from "../redux/authentication/authentication.action";
import useAuth from "../hooks/useAuth";

export type Props = {};

export interface ILoginResponse {
  email: string;
  name: string;
  role: string;
  token: string;
}

const Login: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthUser } = useAuth({
    redirectTo: "/protected",
    redirectIfFound: true,
  });

  console.log(user);

  const onFinish = async (values: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    dispatch(login({ username: values.username, password: values.password }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

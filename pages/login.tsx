import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useAppDispatch } from "../redux/store";
import useAuth from "../hooks/useAuth";
import { ContainerLayout } from "../layouts/ContainerLayout";

export type Props = {};

export interface ILoginResponse {
  email: string;
  name: string;
  role: string;
  token: string;
}

const Login: React.FC<Props> = () => {
  const { login } = useAuth({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });

  const onFinish = async (values: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    login({ email: values.username, password: values.password });
  };
  return (
    <ContainerLayout>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
    </ContainerLayout>
  );
};

export default Login;

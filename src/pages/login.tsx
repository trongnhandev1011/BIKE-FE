import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import useAuth from "@hooks/useAuth";
import { ContainerLayout } from "@layouts/ContainerLayout";
import Image from "next/image";
import loginPic from "../../public/login_banner.svg";

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
      <div
        className="flex justify-center login-container"
        style={{
          height: "100%",
          backgroundColor: "#8BC6EC",
          backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{
            width: "50%",
            height: "80%",
            backgroundColor: "white",
            borderRadius: "20px",
            marginTop: 50,
            boxShadow: "1px 1px 2px 2px #9D9D9D",
          }}
        >
          <Image src={loginPic} alt="Hello" width={500} height={500} />
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            style={{ width: "80%" }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 4, span: 20 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";

import axios, { AxiosResponse, AxiosError } from "axios";

import styled from "styled-components";

export interface LocalStorage {
  access_token: string;
  token_type?: string;
}

export const Login = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const history = useHistory();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const userHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUser(value);
  };

  const passwordHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  const onSubmit = async () => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const bodyFormat = new FormData();
    bodyFormat.set("username", user);
    bodyFormat.set("password", password);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/auth/login`, bodyFormat, config)
        console.log('reponse', response.data);
        localStorage.setItem('data', JSON.stringify(response.data));
        history.push('/sensors')
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <LoginWrapper>
      {}
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input value={user} onChange={userHandle} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password value={password} onChange={passwordHandle} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

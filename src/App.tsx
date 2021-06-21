import React from "react";
import { Layout } from "antd";

import { Login } from "./components/Login/Login";

export const App = () => {
  
  const { Header, Footer, Content } = Layout;

  return (
    <div className="login">
      <Layout>
        <Header>ThermoCo</Header>
        <Content>
          <div>
            <Login />
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
};


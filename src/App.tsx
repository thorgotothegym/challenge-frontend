import React, { useState } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login } from "./components/Login/Login";
import { Sensors } from "./containers/sensors/Sensors";

export const App = () => {
  const { Header, Footer, Content } = Layout;

  return (
    <Layout>
      <Header>ThermoCo</Header>
      <Content>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/sensors">
              <Sensors />
            </Route>
          </Switch>
        </Router>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

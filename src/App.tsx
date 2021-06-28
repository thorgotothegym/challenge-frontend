import React, { useState } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login } from "./components/Login/Login";
import { Sensors } from "./containers/sensors/Sensors";

export const App = () => {
  const { Header, Footer, Content } = Layout;

  return (
    <Router>
      <Layout>
        <Header>ThermoCo</Header>
        <Content>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/sensors">
              <Sensors />
            </Route>
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Router>
  );
};

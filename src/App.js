import React from "react";
// router
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

// redux
import store from "./store";
import { Provider } from "react-redux";
// style

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// components
import { Container } from "reactstrap";
// public
import SignIn from "./compnents/auth/SignIn";
import SignUp from "./compnents/auth/SignUp";
import Recover from "./compnents/auth/Recover";
// private
import Header from "./compnents/layout/Header";
import SideMenu from "./compnents/layout/SideMenu";

// import UnderDev from "./compnents/layout/UnderDev";
import Clients from "./compnents/clients";
import Payments from "./compnents/payments/Payments";
import Projects from "./compnents/projects";
import Expenses from "./compnents/expenses";
import Suppliers from "./compnents/suppliers";
import Settings from "./compnents/settings";
import PrivateRoute from "./compnents/auth/PrivateRoute";
import PublicRoute from "./compnents/auth/PublicRoute";
import Home from "./compnents/home/Home";

import { verifyGreenInvoiceToken } from "./actions/authActions";

import { createClient } from "./utils/toggl";
function App() {
  // verify token
  verifyGreenInvoiceToken();
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          {/* public routes */}
          <Route
            path="/signin"
            exact
            render={() => <PublicRoute component={SignIn} />}
          />
          <Route
            path="/SignUp"
            exact
            render={() => <PublicRoute component={SignUp} />}
          />
          <Route
            path="/Recover"
            exact
            render={() => <PublicRoute component={Recover} />}
          />
          {/* private routes */}
          <Route render={() => <PrivateRoute component={Panel} />} />
        </Switch>
      </Router>
    </Provider>
  );
}

function Panel() {
  return (
    <Container fluid className="p-0 m-0 d-flex">
      <SideMenu />
      <div className="flex-fill ">
        <Header />
        <div className="content_container">
          <Switch>
            {/* private routes */}
            <Route path="/clients" component={Clients} />
            <Route path="/projects" component={Projects} />
            <Route path="/payments" component={Payments} />
            <Route path="/expenses" component={Expenses} />
            <Route path="/suppliers" component={Suppliers} />
            <Route path="/settings" component={Settings} />
            <Route path="/home" component={Home} />
            {/* <Route path="/" component={UnderDev} /> */}
          </Switch>
        </div>
      </div>
    </Container>
  );
}

export default App;

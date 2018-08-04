import React from "react";
import { Card, Col, Row } from "antd";
import LoginForm from "./components/LoginForm";

const CardHeader = () => (
  <div>
    <h1 className="login__title">FSchat</h1>
    <p className="login__subtitle">A basic chat application</p>
  </div>
);

const LoginPage = props => {
  return (
    <Row type="flex" justify="space-around" align="bottom">
      <Col lg={7} md={3} sm={2} xs={1} />
      <Col lg={10} md={18} sm={20} xs={22}>
        <Card title={<CardHeader />} className="login" bordered>
          <LoginForm {...props} />
        </Card>
      </Col>
      <Col lg={7} md={3} sm={2} xs={1} />
    </Row>
  );
};

export default LoginPage;

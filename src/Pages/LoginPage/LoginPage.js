import React from "react";
import { Card, Col, Row } from "antd";
import LoginForm from "./components/LoginForm";

const CardHeader = () => <h1 className="login__header">FSchat</h1>;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      loading: false,
      socket: null
    };
  }

  render() {
    return (
      <Row type="flex" justify="space-around" align="bottom">
        <Col lg={8} md={8} sm={4} xs={1} />
        <Col lg={8} md={8} sm={16} xs={22}>
          <Card title={<CardHeader />} className="login" bordered>
            <LoginForm onLogin={this.props.onLogin} />
          </Card>
        </Col>
        <Col lg={8} md={8} sm={4} xs={1} />
      </Row>
    );
  }
}

export default LoginPage;

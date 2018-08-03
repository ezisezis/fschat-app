import React from "react";
import { Col, Row } from "antd";
import MessageBoard from "./components/MessageBoard";
import io from "socket.io-client";

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      messages: []
    };

    this.socket = io("http://localhost:8080", {
      query: {
        username: props.username
      }
    });
  }

  componentDidMount() {
    this.socket.on("connect", () =>
      this.setState({
        connected: true
      })
    );

    // this.socket.io.on("disconnect", () =>
    //   this.setState({
    //     connected: false
    //   })
    // );
  }

  render() {
    if (this.state.connected) {
      return (
        <Row type="flex" justify="space-around" align="bottom">
          <Col lg={8} md={8} sm={4} xs={1} />
          <Col lg={8} md={8} sm={16} xs={22}>
            <MessageBoard messages={this.state.messages} />
          </Col>
          <Col lg={8} md={8} sm={4} xs={1} />
        </Row>
      );
    }

    return <h1>Connecting... </h1>;
  }
}

export default ChatPage;

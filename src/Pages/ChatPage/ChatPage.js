import React from "react";
import { Button, Col, Row } from "antd";
import MessageBoard from "./components/MessageBoard";

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          message: `Welcome, ${props.username}!`
        }
      ]
    };

    this.socket = this.props.socket;
    this.onSend = this.onSend.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
  }

  componentDidMount() {
    this.socket.io.on("message", data =>
      this.setState(previousState => {
        return { messages: [...previousState.messages, data] };
      })
    );

    this.socket.io.on("user_joined", ({ username }) =>
      this.setState(previousState => {
        return {
          messages: [
            ...previousState.messages,
            {
              message: `User ${username} joined chat...`
            }
          ]
        };
      })
    );
  }

  onSend(message) {
    const messageToSend = { message, username: this.props.username };
    this.socket.io.emit("message", messageToSend);
    this.setState(previousState => {
      return { messages: [...previousState.messages, messageToSend] };
    });
  }

  onDisconnect() {
    this.socket.io.disconnect();
  }

  render() {
    return (
      <Row type="flex" justify="space-around" align="bottom">
        <Col lg={7} md={3} sm={2} xs={1} />
        <Col lg={10} md={18} sm={20} xs={22}>
          <div className="disconnect">
            <Button
              type="danger"
              onClick={this.onDisconnect}
              className="disconnect__btn"
            >
              Disconnect
            </Button>
          </div>
          <MessageBoard messages={this.state.messages} onSend={this.onSend} />
        </Col>
        <Col lg={7} md={3} sm={2} xs={1} />
      </Row>
    );
  }
}

export default ChatPage;

import React from "react";
import { message } from "antd";

import "./App.css";
import LoginPage from "./Pages/LoginPage";
import ChatPage from "./Pages/ChatPage";
import Socket from "./socket";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      connecting: false,
      username: null
    };

    this.onLogin = this.onLogin.bind(this);
    this.onSocketConnected = this.onSocketConnected.bind(this);
    this.onSocketDisconnected = this.onSocketDisconnected.bind(this);
    this.onSocketFailedToConnect = this.onSocketFailedToConnect.bind(this);
    this.onSocketConnectionError = this.onSocketConnectionError.bind(this);
    this.onKicked = this.onKicked.bind(this);
  }

  onLogin(username) {
    if (username) {
      this.setState(
        {
          username,
          connecting: true
        },
        () => {
          this.socket = new Socket(username);
          this.socket.registerConnectionHandlers(
            this.onSocketConnected,
            this.onSocketDisconnected,
            this.onSocketFailedToConnect,
            this.onSocketConnectionError,
            this.onKicked
          );
        }
      );
    }
  }

  onSocketConnected() {
    this.setState({
      connecting: false,
      connected: true
    });
  }

  onSocketDisconnected() {
    this.setState({
      connecting: false,
      connected: false
    });
    message.error("You were disconnected");
  }

  onSocketFailedToConnect({ reason }) {
    this.setState({
      connecting: false,
      connected: false
    });
    let messageText = "Failed connection attempt. Unknown server error.";
    switch (reason) {
      case "INVALID_USERNAME":
        messageText = "Failed connection attempt. Invalid username.";
        break;
      case "NO_USERNAME":
        messageText = "Failed connection attempt. No username provided.";
        break;
      case "ID_TAKEN":
        messageText = "Failed connection attempt. Socket ID taken.";
        break;
      case "USERNAME_TAKEN":
        messageText = "Failed connection attempt. Username already taken.";
        break;
      default:
        break;
    }
    message.error(messageText);
  }

  onKicked() {
    this.setState({
      connecting: false,
      connected: false
    });
    message.error("Kicked due to inactivity!");
  }

  onSocketConnectionError() {
    this.setState({
      connecting: false,
      connected: false
    });
    message.error("Could not connect to server!");
  }

  render() {
    if (!this.state.connected) {
      return (
        <LoginPage onLogin={this.onLogin} connecting={this.state.connecting} />
      );
    }
    return <ChatPage {...this.state} socket={this.socket} />;
  }
}
export default App;

import React from "react";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import ChatPage from "./Pages/ChatPage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      username: null
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(username) {
    if (username) {
      this.setState({
        loggedIn: true,
        username
      });
    }
  }

  render() {
    if (!this.state.loggedIn) {
      return <LoginPage onLogin={this.onLogin} />;
    }
    return <ChatPage username={this.state.username} />;
  }
}
export default App;

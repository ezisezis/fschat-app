import io from "socket.io-client";
import configuration from "./configuration";

class Socket {
  constructor(username) {
    this.io = io(
      `http://${configuration.socket.host}:${configuration.socket.port}`,
      {
        query: {
          username
        },
        autoConnect: configuration.socket.autoConnect,
        reconnection: configuration.socket.reconnection,
        timeout: configuration.socket.timeout
      }
    );
  }

  registerConnectionHandlers(
    connectedHandler,
    disconnectedHandler,
    failureHandler,
    connectionErrorHandler,
    kickedHandler
  ) {
    this.io.open();
    this.io.on("connect_success", connectedHandler);
    this.io.on("disconnect", disconnectedHandler);
    this.io.on("connect_failed", failureHandler);
    this.io.on("connect_error", connectionErrorHandler);
    this.io.on("connect_timeout", connectionErrorHandler);
    this.io.on("kicked_inactive", kickedHandler);
  }

  registerChatHandlers(messageHandler, userJoinedHandler) {
    this.io.on("message", messageHandler);
    this.io.on("user_joined", userJoinedHandler);
  }

  disconnectFromSocket() {
    this.io.disconnect();
  }

  sendMessage(message) {
    this.io.emit("message", message);
  }
}

export default Socket;

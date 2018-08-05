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

  unregisterChatHandlers() {
    this.io.removeAllListeners("message");
    this.io.removeAllListeners("user_joined");
  }

  disconnectFromSocket() {
    this.io.disconnect(true);
  }

  sendMessage(message) {
    this.io.emit("message", message);
  }
}

export default Socket;

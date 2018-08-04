import io from "socket.io-client";

class Socket {
  constructor(username) {
    this.io = io("http://localhost:8080", {
      query: {
        username
      },
      autoConnect: false,
      reconnection: false,
      timeout: 10000
    });
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

  // function unregisterHandler() {
  //   socket.off('message')
  // }
}

export default Socket;

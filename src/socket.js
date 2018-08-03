import io from "socket.io-client";

class Socket {
  constructor(username) {
    this.io = io("http://localhost:8080", {
      query: {
        username
      }
    });
  }

  registerMessageHandler(messageReceiver) {
    this.io.on("userHasJoined", messageReceiver);
  }

  unregisterMessageHandler() {
    this.io.off("message");
  }
  // function unregisterHandler() {
  //   socket.off('message')
  // }
}

export default Socket;

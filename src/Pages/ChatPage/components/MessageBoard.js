import React from "react";
import InputForm from "./InputForm";
import MessageList from "./MessageList";

const MessageBoard = ({ messages, onSend }) => {
  return (
    <div className="chat">
      <MessageList messages={messages} />
      <InputForm onSend={onSend} />
    </div>
  );
};

export default MessageBoard;

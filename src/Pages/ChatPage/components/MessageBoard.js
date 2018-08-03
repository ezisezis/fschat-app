import React from "react";
import { List } from "antd";
import InputForm from "./InputForm";

const MessageBoard = ({ messages, onSend }) => {
  return (
    <div className="chat">
      <div className="chat__messages">
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.username}
                description={item.message}
              />
            </List.Item>
          )}
        />
      </div>
      <InputForm onSend={onSend} />
    </div>
  );
};

export default MessageBoard;

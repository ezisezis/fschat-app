import React from "react";
import { List } from "antd";

const MessageList = ({ messages }) => {
  return (
    <div className="chat__messages">
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={item => (
          <List.Item className={item.username ? "" : "chat__messages__system"}>
            <List.Item.Meta title={item.username} description={item.message} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default MessageList;

import React from "react";
import { List } from "antd";

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.scrollableDiv = React.createRef();
  }
  shouldComponentUpdate(nextProps) {
    return this.props.messages.length !== nextProps.messages.length;
  }
  render() {
    return (
      <div className="chat__messages" ref={this.scrollableDiv}>
        <List
          itemLayout="horizontal"
          dataSource={this.props.messages}
          renderItem={item => (
            <List.Item
              className={item.username ? "" : "chat__messages__system"}
            >
              <List.Item.Meta
                title={item.username}
                description={item.message}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
export default MessageList;

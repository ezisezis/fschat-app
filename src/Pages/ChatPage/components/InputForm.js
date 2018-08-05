import React from "react";
import { Button, Form, Input } from "antd";
import escapeHtml from "escape-html";
import configuration from "../../../configuration";

class InputForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.message) {
          this.props.onSend(escapeHtml(values.message));
          this.props.form.resetFields();
        }
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldError, getFieldValue } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="chat__sendbox">
        <Form.Item
          validateStatus={getFieldError("message") ? "error" : ""}
          help={getFieldError("message") || ""}
          className="chat__sendbox__input"
        >
          {getFieldDecorator("message", {
            rules: [
              {
                max: configuration.maximumMessageLength,
                message: `Message too long, maximum allowed is ${
                  configuration.maximumMessageLength
                } characters!`
              }
            ]
          })(<Input size="large" placeholder="Message" />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!getFieldValue("message")}
            size="large"
            icon="arrow-right"
            className=""
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(InputForm);

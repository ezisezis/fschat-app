import React from "react";
import { Button, Form, Input } from "antd";

class InputForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.message) {
          this.props.onSend(values.message);
        }
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="chat__sendbox">
        <Form.Item validateStatus="" help="" className="chat__sendbox__input">
          {getFieldDecorator("message", {
            rules: [{ required: true, message: "Please input the message!" }]
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

import React from "react";
import { Form, Icon, Input, Button } from "antd";
import escapeHtml from "escape-html";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onLogin(escapeHtml(values.userName));
      }
    });
  }

  render() {
    const {
      getFieldDecorator,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const userNameError =
      isFieldTouched("userName") && getFieldError("userName");
    const isJoinButtonDisabled = userNameError || !isFieldTouched("userName");

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={userNameError ? "error" : ""}
          help={userNameError || ""}
        >
          {getFieldDecorator("userName", {
            rules: [
              { required: true, message: "Please input your username!" },
              {
                pattern: /^\S{2,20}$/,
                message:
                  "Username must be between 2 and 20 characters without spaces!"
              }
            ]
          })(
            <Input
              size="large"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isJoinButtonDisabled}
            size="large"
            icon={this.props.connecting ? "loading" : "login"}
            className="login__join"
          >
            {this.props.connecting ? "Connecting" : "Join"}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);

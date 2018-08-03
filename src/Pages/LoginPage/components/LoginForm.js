import React from "react";
import { Form, Icon, Input, Button } from "antd";

class LoginForm extends React.Component {
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
        this.props.onLogin(values.userName);
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
            rules: [{ required: true, message: "Please input your username!" }]
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
            icon="login"
            className="login__join"
          >
            Join
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);

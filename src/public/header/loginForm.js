import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import React from'react'
import Provider from '../axios/provider'
import store from '../store/UserInfo.js'
import { Link } from 'react-router-dom'


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props);
    this.props.form.validateFields((err, values) => {
      if (!err) {
          let data = new FormData();
          data.append('username', values.username);
          data.append('password', values.password);
          Provider.post('http://127.0.0.1:8000/api/account/login/', data).then(response => {
              if (response.data.msg === 'success') {
                  store.login(true);
                  notification.success({
                      message: 'Success!',
                      description: '登录成功！',
                      top: 65
                  });
                  setTimeout(() => {
                      this.props.closeDrawer()
                  }, 1000)
              } else {
                  notification.error({
                      message: 'Failure',
                      description: response.data.msg,
                      top: 65
                });
              }
          })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="https://www.baidu.com">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
            Or <Link to={'/register'}>register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'normal_log' })(NormalLoginForm);

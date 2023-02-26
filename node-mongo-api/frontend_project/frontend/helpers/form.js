import { Button, Checkbox, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { loginThunk } from '../store/thunks/thunks';
import React, { useEffect } from 'react';
import loginCheck from '../utilities/loginCheck';
const FormContainer = () => {
  const dispatch = useDispatch();
  const loginDetails = useSelector(state=> state.login.loginDetails);
  const onFinish = (values) => {
    console.log('Success:', values);
    dispatch(loginThunk(values)).then((res) => {
      console.log("loginDetails",loginDetails)
      // loginCheck(loginDetails?.loginDetails)
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormContainer;
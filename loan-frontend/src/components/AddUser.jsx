import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { BASE_API_URL } from '../App';

const AddUser = () => {
  const [alert, setAlert] = useState({
    showAlert: false,
    alertMessage: '',
    alertType: '',
  });
  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 6,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 11,
      span: 6,
    },
  };

  const onFinish = async values => {
    const { success, message } = await fetch(`${BASE_API_URL}/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
      mode: 'cors',
    }).then(res => res.json());
    if (success) {
      setAlert({
        showAlert: true,
        alertMessage: message,
        alertType: 'success',
      });
    } else {
      setAlert({
        showAlert: true,
        alertMessage: message,
        alertType: 'error',
      });
    }
  };

  return (
    <div>
      {alert.showAlert && (
        <Alert
          message={alert.alertType}
          description={alert.alertMessage}
          type={alert.alertType}
          closable
          onClose={() => setAlert(alert => ({ ...alert, showAlert: false }))}
          showIcon
          banner
          style={{ margin: 'auto', marginBottom: '10px' }}
          className="alert-styling"
        />
      )}
      <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Add New Admin</p>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input new admin's email!",
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
              message: 'Please input password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;

import React, { useEffect, useState } from 'react';
import { Alert, Button, Divider, Form, Input, notification, Spin } from 'antd';
import { BASE_API_URL } from '../App';

const Settings = ({ id }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [emailButtonDisabled, setEmailButtonDisabled] = useState(true);
  const [form] = Form.useForm();

  const layout = {
    wrapperCol: {
      span: 6,
    },
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      duration: 3,
      placement: 'topLeft',
    });
  };

  useEffect(() => {
    (async () => {
      const {
        admin: { email, password },
      } = await fetch(`${BASE_API_URL}/admin/${id}`, {
        mode: 'cors',
      }).then(res => res.json());
      setUserData({
        email,
        password,
      });
    })();
  }, [id]);

  const value = form.getFieldValue('email');
  useEffect(() => {
    if (value) {
      setEmailButtonDisabled(value === userData.email || value.length === 0);
    }
  }, [value, userData.email]);

  const handleEmailUpdate = async () => {
    const newEmail = form.getFieldValue('email');
    const { success, message, admin } = await fetch(
      `${BASE_API_URL}/admin/email/${id}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newEmail }),
        mode: 'cors',
      }
    ).then(res => res.json());
    console.log(success, message, admin);
    if (success) {
      setUserData(userData => ({ ...userData, email: admin.email }));

      return openNotificationWithIcon('success', 'Success', message);
    }
  };

  const handlePasswordUpdate = async () => {
    const oldPassword = form.getFieldValue('currentPassword');
    const newPassword = form.getFieldValue('newPassword');
    const repeatNewPassword = form.getFieldValue('repeatNewPassword');

    if (oldPassword !== userData.password) {
      alert('Old password does not match');
    } else if (newPassword !== repeatNewPassword) {
      alert('New password does not match');
    } else {
      const { success, message, admin } = await fetch(
        `${BASE_API_URL}/admin/password/${id}`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: newPassword }),
          mode: 'cors',
        }
      ).then(res => res.json());
      if (success) {
        setUserData(userData => ({ ...userData, password: admin.password }));

        return openNotificationWithIcon('success', 'Success', message);
      }
    }
  };

  const handleEmailChange = ({ target: { value } }) => {
    setEmailButtonDisabled(value === userData.email || value.length === 0);
    form.setFieldsValue({
      email: value,
    });
  };

  const handlePasswordChange = (name, value) => {
    form.setFieldsValue({
      name: value,
    });
  };

  if (userData.email === '') {
    return <Spin size="large" />;
  } else
    return (
      <div>
        <Alert
          message="Informational Notes"
          description="Some more information"
          type="info"
          showIcon
          banner
          style={{ display: 'block' }}
          className="banner-info"
        />
        <Divider>Email Settings</Divider>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            email: userData.email,
          }}
          layout="vertical"
          form={form}
        >
          <section>
            <Form.Item label="Email" name="email">
              <Input onChange={handleEmailChange} />
            </Form.Item>
            <Button disabled={emailButtonDisabled} onClick={handleEmailUpdate}>
              Update
            </Button>
          </section>
          <Divider>Password Settings</Divider>
          <section>
            <Form.Item label="Current Password" name="currentPassword">
              <Input
                onChange={({ target: { value } }) =>
                  handlePasswordChange('currentPassword', value)
                }
              />
            </Form.Item>
            <Form.Item label="New Password" name="newPassword">
              <Input
                onChange={({ target: { value } }) =>
                  handlePasswordChange('newPassword', value)
                }
              />
            </Form.Item>
            <Form.Item label="Repeat New Password" name="repeatNewPassword">
              <Input
                onChange={({ target: { value } }) =>
                  handlePasswordChange('repeatNewPassword', value)
                }
              />
            </Form.Item>
          </section>
          <Button onClick={handlePasswordUpdate}>Update</Button>
        </Form>
      </div>
    );
};

export default Settings;

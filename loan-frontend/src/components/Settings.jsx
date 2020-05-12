import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { BASE_API_URL } from '../App';

const Settings = ({ id }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

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
  if (userData.email === '') {
    return <Spin size="large" />;
  } else return <div>Hello</div>;
};

export default Settings;

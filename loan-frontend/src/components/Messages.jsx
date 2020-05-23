import React, { useEffect, useState } from 'react';
import { BASE_API_URL } from '../App';
import { Result, Spin } from 'antd';

const Messages = ({ id }) => {
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
  } else
    return (
      <Result
        title="No new messages"
        status="404"
        subTitle="You have no new messages"
      />
    );
};

export default Messages;

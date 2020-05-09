import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import { useLocalStorage } from '../util/hooks';
import { BASE_API_URL, JWT_KEY } from '../App';

const Login = ({ history }) => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [jwt, setJwt] = useLocalStorage(JWT_KEY, '');

  useEffect(() => {
    if (jwt.length !== 0) {
      history.push('/');
    }
  }, [jwt, history]);

  const handleChange = ({ target: { name, value } }) => {
    setLogin(login => ({ ...login, [name]: value }));
  };

  const handleLogin = async () => {
    const { success } = await fetch(`${BASE_API_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
      mode: 'cors',
    }).then(res => res.json());
    if (success) {
      setJwt('abcd');
    }
  };

  return (
    <Card title={<p style={{ textAlign: 'center' }}>Login to Portal</p>}>
      <form
        action=""
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={login.email}
          onChange={handleChange}
          placeholder="Email Address"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={login.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <Button type="primary" onClick={handleLogin}>
          Login
        </Button>
      </form>
    </Card>
  );
};

export default Login;

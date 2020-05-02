import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../util/hooks';
import {
  AuditOutlined,
  BankOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { JWT_KEY } from '../App';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import NewEntry from './NewEntry';
import Entries from './Entries';
import AddUser from './AddUser';

const { Content, Footer, Sider } = Layout;

const Dashboard = ({ history }) => {
  const [jwt, setJwt] = useLocalStorage(JWT_KEY, '');
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    if (jwt.length === 0) {
      history.push('/login');
    }
  }, [jwt, history]);

  if (jwt.length === 0) {
    return <div>Loading</div>;
  } else {
    const currentPage = {
      1: <NewEntry />,
      2: <Entries />,
      3: <AddUser />,
    };

    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo">
            <p style={{ color: 'black', textAlign: 'center' }}>
              {' '}
              <BankOutlined /> Bank of Ghana
            </p>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={({ key }) => {
              if (key === '4') setJwt('');
              setPageIndex(parseInt(key, 10));
            }}
          >
            <Menu.Item key="1">
              <AuditOutlined />
              New Entry
            </Menu.Item>
            <Menu.Item key="2">
              <UnorderedListOutlined />
              Entries
            </Menu.Item>
            <Menu.Item key="3">
              <UserOutlined />
              Add User
            </Menu.Item>
            <Menu.Item key="4">
              <LogoutOutlined />
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
          <Content className="site-layout-background">
            <div style={{ padding: 25, overflow: 'auto' }}>
              {currentPage[pageIndex]}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Loan Calculator ©2020 Created by Ranny Inc.
          </Footer>
        </Layout>
      </Layout>
    );
  }
};

export default Dashboard;

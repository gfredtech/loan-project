import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../util/hooks';
import {
  AuditOutlined,
  BankTwoTone,
  LogoutOutlined,
  MessageOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { JWT_KEY } from '../App';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import NewEntry from './NewEntry';
import Entries from './Entries';
import AddUser from './AddUser';
import Settings from './Settings';
import Messages from './Messages';

const { Content, Footer, Sider } = Layout;

const Dashboard = ({ history }) => {
  const [jwt, setJwt] = useLocalStorage(JWT_KEY, '');
  const [pageIndex, setPageIndex] = useState(1);
  const [collapse, setCollapse] = useState(false);
  const push = history.push;

  useEffect(() => {
    if (jwt.length === 0) {
      push('/login');
    }
  }, [jwt, push]);

  if (jwt.length === 0) {
    return <div>Loading</div>;
  } else {
    const currentPage = {
      1: <NewEntry />,
      2: <Entries />,
      3: <AddUser />,
      4: <Settings id={jwt} />,
      5: <Messages id={jwt} />,
    };

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          style={{
            height: '100vh',
            position: 'fixed',
          }}
          collapsible
          onCollapse={collapsed => setCollapse(collapsed)}
          collapsed={collapse}
        >
          <div className="logo">
            <BankTwoTone style={{ fontSize: 40 }} />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={({ key }) => {
              if (key === '0') setJwt('');
              setPageIndex(parseInt(key, 10));
            }}
          >
            <Menu.Item key="1" icon={<AuditOutlined />}>
              New Entry
            </Menu.Item>
            <Menu.Item key="2" icon={<UnorderedListOutlined />}>
              Entries
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              Add User
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
            <Menu.Item key="5" icon={<MessageOutlined />}>
              Messages
            </Menu.Item>
            <Menu.Item key="0" icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: collapse ? 80 : 200 }}>
          <Content className="site-layout-background">
            <div style={{ padding: 50, overflow: 'auto' }}>
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

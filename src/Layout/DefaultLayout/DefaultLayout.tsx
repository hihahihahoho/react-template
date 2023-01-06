
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';
import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);

type Props = {
  children: React.ReactElement;
};

const DefaultLayout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
  };


  const handleMenuOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let matches = useMatch(location.pathname);
  console.log(matches)
  return (
    <>
      <Layout style={{ height: "100vh" }} hasSider={true}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu selectedKeys={selectedKeys} defaultOpenKeys={['/products/female']} onClick={handleMenuClick} mode="inline" style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="/">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.SubMenu key="/products" title="Products">
              <Menu.Item key="/products/male">
                <Link to="/products/male">Male</Link>
              </Menu.Item>
              <Menu.SubMenu key="/products/female" title="Female">
                <Menu.Item key="/products/female/">
                  <Link to="/products/female/">All</Link>
                </Menu.Item>
                <Menu.Item key="/products/female/pants">
                  <Link to="/products/female/pants">Pants</Link>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default DefaultLayout
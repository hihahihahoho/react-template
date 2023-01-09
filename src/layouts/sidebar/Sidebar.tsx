
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarCollapsed } from '../DefaultLayout/DefaultLayout';


const Sidebar: React.FC = () => {
  const context = useContext(SidebarCollapsed);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
  };


  return (
    <>
      <Sider trigger={null} collapsible collapsed={context?.collapsed}>
        <div className="logo" />
        <Menu selectedKeys={selectedKeys} defaultOpenKeys={['/products/female']} onClick={handleMenuClick} mode="inline" style={{ height: '100%', borderRight: 0 }}>
        </Menu>
      </Sider>
    </>
  )
}

export default Sidebar
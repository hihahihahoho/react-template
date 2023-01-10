import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import React, { createContext, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';

type Props = {
  children: React.ReactElement;
};

type CollapsedType = boolean;
type SetCollapsedType = (collapsed: CollapsedType) => void;

interface ContextType {
  collapsed: CollapsedType;
  setCollapsed: SetCollapsedType;
}

const SidebarCollapsed = createContext<ContextType | undefined>(undefined);

const DefaultLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<CollapsedType>(false);
  return (
    <>
      <SidebarCollapsed.Provider value={{ collapsed, setCollapsed }}>
        <Layout style={{ height: '100vh' }} hasSider={true}>

          <Sidebar />
          <Layout className="site-layout">
            <Header style={{ padding: 0 }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </SidebarCollapsed.Provider>
    </>
  );
};

export default DefaultLayout;
export { SidebarCollapsed };


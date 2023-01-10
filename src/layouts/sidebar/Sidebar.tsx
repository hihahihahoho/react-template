
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import type { MenuProps } from 'antd/es/menu';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { modifiedRouter, RouteConfigInterface } from '../../routes/routes';
import { getAncestors, getIdByName, removeTrailingSlash } from '../../utils/utils';
import { SidebarCollapsed } from '../DefaultLayout/DefaultLayout';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label?: React.ReactNode | String,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
let items: MenuItem[] = []
function getItemTree(route: RouteConfigInterface[]) {
  let menuItem: MenuItem[] = [];
  route.forEach(route => {
    if (!route.isHideOnMenu) {
      let label: React.ReactNode = route.fullPath && route.component ? (
        <>
          <Link to={route.fullPath}>
            <>
              {route.title}
            </>
          </Link>
        </>
      ) : (<>
        {route.title}
      </>);
      menuItem.push(getItem(label, route.key, route.icon, route.children && getItemTree(route.children)))
    }
  })
  return menuItem;
}
items = getItemTree(modifiedRouter)


const Sidebar: React.FC = () => {
  const context = useContext(SidebarCollapsed);
  const location = useLocation();
  const currentLocation = [getIdByName(modifiedRouter, removeTrailingSlash(location.pathname), 'key', 'fullPath')]
  const currentOpen = getAncestors(currentLocation[0])
  console.log(location)


  return (
    <>
      <Sider breakpoint="lg" trigger={null} collapsible collapsed={context?.collapsed}>
        <div className="logo" />
        <Menu selectedKeys={currentLocation} defaultOpenKeys={currentOpen} onOpenChange={(openKeys) => {
          console.log(openKeys)
        }} mode="inline" style={{ height: '100%', borderRight: 0 }} items={items}>
        </Menu>
      </Sider>
    </>
  )
}

export default Sidebar
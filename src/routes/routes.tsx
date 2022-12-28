import _ from 'lodash';
import { ReactElement } from 'react';
import Home from '../pages/Home/Home';

interface Route {
  component?: string | ReactElement;
  exact?: boolean;
  parentPath?: string,
  path?: string;
  routes?: Route[];
  children?: Route[];
}

const routes: Route[] = [
  {
    component: <Home />,
    exact: true,
    path: '/home',
    routes: [
      {
        component: <Home />,
        path: '/home-child',
      }, {
        component: '/HomeChild2',
        path: '/child-abc',
        routes: [
          {
            component: '/HomeChild21',
            path: '/HomeChild21',
          }, {
            component: '/HomeChild22',
            path: '/',
            children: [
              {
                component: '/HomeChild221',
                path: '/HomeChild221',
              }, {
                component: '/HomeChild222',
                path: '/',
              }
            ]
          }
        ]
      }
    ]
  }
];


const getRoutes = (routeChild: Route): Route[] => {
  // Add type checking to ensure that the input is a valid Route object
  if (!routeChild || typeof routeChild !== 'object' || !routeChild.hasOwnProperty('path')) {
    throw new Error('Invalid input: routeChild must be a valid Route object');
  }

  let routes: Route[] = [];

  // Set the path for the current route
  let path = `${routeChild.parentPath || ''}${routeChild.path || ''}`;
  path = path.replace('//', '/')
  routes.push(_.omit({ ...routeChild, path: path || '' }, ['routes'], ['parentPath']));

  // Recursively process any child routes
  if (Array.isArray(routeChild.routes)) {
    let routeChildProps = _.omit({ ...routeChild }, ['routes'], ['parentPath']);
    routes.push(
      ..._.flatMapDeep(routeChild.routes, (child) => getRoutes(_.defaultsDeep({ ...routeChildProps, ...child, parentPath: `${routeChild.parentPath || ''}${routeChild.path || ''}` }))),
    );
  }

  return routes;
};




const route2 = _.flatMapDeep(routes, getRoutes);

export default route2;

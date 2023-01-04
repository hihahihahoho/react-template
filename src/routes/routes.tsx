import _ from 'lodash';
import { ReactElement } from 'react';

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
    component: 'home',
    path: 'home',
    routes: [
      {
        component: 'HomeChild2',
        path: 'home-child',
      }, {
        component: 'HomeChild2',
        path: 'child-abc',
        exact: true,
        routes: [
          {
            component: 'HomeChild21',
            path: 'HomeChild21',
          }, {
            component: 'HomeChild22',
            path: '/',
            routes: [
              {
                component: 'HomeChild221',
                path: 'HomeChild221',
              }, {
                component: '/HomeChild222',
              }
            ]
          }
        ]
      }
    ]
  }
];


function inheritProperty(routes?: Route[], parrentRouteProp?: Route, excludedProp: string[] = []) {
  if (!routes) {
    return;
  }
  return routes.map(route => {
    const { ...routeProp } = route;
    const filteredObject = _.omit(parrentRouteProp, excludedProp)
    route = { ...filteredObject, ...routeProp }
    if (route.routes) {
      route.routes = inheritProperty(route.routes, route, excludedProp);
    }
    return route;
  });
}

const routes2 = inheritProperty(routes, {}, ['path', 'routes', 'component', 'name']);

export default routes2;

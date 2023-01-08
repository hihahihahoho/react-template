import _ from 'lodash';
import { lazy } from 'react';
import Page404 from '../pages/404/404';
// import Home from '../pages/Home/Home';
import Female from '../pages/Products/Female/Female';
import Pants from '../pages/Products/Female/Pants/Pants';
import PantsDetail from '../pages/Products/Female/Pants/PantsDetail';
import { addKeys } from '../utils/utils';

const Home = lazy(() => import('../pages/Home/Home'))

interface RouteConfigInterface {
  title?: string | React.FC;
  component?: string | React.FC;
  layout?: string | React.FC;
  exact?: boolean;
  path?: string;
  children?: RouteConfigInterface[];
  index?: boolean;
}

const page404: RouteConfigInterface = {
  component: Page404,
  path: '*',
}

const routes: RouteConfigInterface[] = [
  {
    title: 'Trang chủ',
    component: Home,
    index: true
  }, {
    title: 'Trang chủ',
    component: Home,
    path: 'home',
  }, {
    title: 'Sản phẩm',
    path: 'products',
    index: false,
    children: [
      {
        title: 'Nam',
        component: Home,
        path: 'male',
      }, {
        title: 'Nữ',
        path: 'female',
        children: [
          {
            title: 'Tất cả',
            component: Female,
            index: true,
          }, {
            title: 'Tất cả',
            component: Home,
            path: 'shirt',
          }, {
            path: 'pants',
            children: [
              {
                index: true,
                component: Pants,
              }, {
                component: PantsDetail,
                path: ':id'
              }
            ]
          }
        ]
      }
    ]
  }, {
    ...page404
  }
];


function inheritProperty(routes?: RouteConfigInterface[], parrentRouteProp?: RouteConfigInterface, excludedProp: string[] = []): any {
  if (!routes) {
    return;
  }
  return routes.map(route => {
    const { ...routeProp } = route;
    const filteredObject = _.omit(parrentRouteProp, excludedProp)
    route = { ...filteredObject, ...routeProp }
    if (route.children) {
      route.children = inheritProperty(route.children, route, excludedProp);
      route.children?.push(page404)
    }

    if (route.index === false && route.children) {
      route.children = route.children.map(({ path, ...prop }) => ({
        ...prop, path: `${route.path}/${path}`
      }))
    }
    return route;

  });
}


let routesRouter = inheritProperty(routes, {}, ['path', 'routes', 'children', 'component', 'name', 'index']);
routesRouter = addKeys(routesRouter, 'children')

export type { RouteConfigInterface };
export { routesRouter, routes };


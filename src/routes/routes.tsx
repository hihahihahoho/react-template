import _ from 'lodash';
import Page404 from '../pages/404/404';
import Home from '../pages/Home/Home';
import Female from '../pages/Products/Female/Female';
import Pants from '../pages/Products/Female/Pants/Pants';
import PantsDetail from '../pages/Products/Female/Pants/PantsDetail';

interface RouteConfigInterface {
  component?: string | React.FC;
  layout?: string | React.FC;
  exact?: boolean;
  path?: string;
  routes?: RouteConfigInterface[];
  children?: RouteConfigInterface[];
  index?: boolean;
}

const page404: RouteConfigInterface = {
  component: Page404,
  path: '*',
}

const routes: RouteConfigInterface[] = [
  {
    component: Home,
    index: true
  }, {
    component: Home,
    path: 'home',
  }, {
    path: 'products',
    index: false,
    routes: [
      {
        component: Home,
        path: 'male',
      }, {
        path: 'cat/female',
        routes: [
          {
            component: Female,
            index: true,
          }, {
            component: Home,
            path: 'shirt',
          }, {
            path: 'abc/pants',
            routes: [
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
    if (route.routes) {
      route.routes = inheritProperty(route.routes, route, excludedProp);
      route.routes?.push(page404)
    }

    if (route.index === false && route.routes) {
      route.routes = route.routes.map(({ path, ...prop }) => ({
        ...prop, path: `${route.path}/${path}`
      }))
    }
    return route;

  });
}


const routesRouter = inheritProperty(routes, {}, ['path', 'routes', 'component', 'name', 'index']);

console.log(routesRouter)

export type { RouteConfigInterface };
export { routesRouter, routes };


import _ from 'lodash';
import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import { page404, RouteConfigInterface, routes } from './routes';

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

const renderRoutes: any = (routes?: RouteConfigInterface[], parentKey?: string) => {
  return routes?.map((route, index) => {
    let Layout: any = route.layout || DefaultLayout || Fragment;
    let Page: any = route.component;
    if (route.index === false && route.children) {
      return renderRoutes(route.children, parentKey)
    }
    return route.children ? (
      <Route
        key={`${parentKey}-${index}`}
        path={route.path}
      >
        {renderRoutes(route.children, parentKey)}
      </Route>
    ) : (
      <Route
        key={index}
        index={route.index}
        path={route.path}
        element={
          Page ? (
            <Layout>
              <Page />
            </Layout>
          ) : null
        }
      />
    );
  });
};

function RenderRouter() {
  return (
    <Routes>
      {renderRoutes(routesRouter)}
    </Routes>
  );
}

export default RenderRouter;

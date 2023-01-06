import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './Layout/DefaultLayout/DefaultLayout';
import { RouteConfigInterface, routesRouter } from './routes/routes';

const renderRoutes: any = (routes?: RouteConfigInterface[], parentKey?: string) => {
  return routes?.map((route, index) => {
    let Layout: any = route.layout || DefaultLayout || Fragment;
    let Page: any = route.component;
    if (route.index === false && route.routes) {
      return renderRoutes(route.routes, parentKey)
    }
    return route.routes ? (
      <Route
        key={`${parentKey}-${index}`}
        path={route.path}
      >
        {renderRoutes(route.routes, parentKey)}
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

function App() {
  return (
    <Routes>
      {renderRoutes(routesRouter)}
    </Routes>
  );
}

export default App;

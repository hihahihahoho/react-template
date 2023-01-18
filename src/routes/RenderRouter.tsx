import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import { modifiedRouter, RouteConfigInterface } from './routes';

const renderRoutes: any = (routes?: RouteConfigInterface[], parentKey?: string) => {
	return routes?.map((route, index) => {
		let Layout: any = route.layout || DefaultLayout || Fragment;
		let Page: any = route.component;
		if (route.index === false && route.children) {
			return renderRoutes(route.children, parentKey);
		}
		return route.children ? (
			<Route key={`${parentKey}-${index}`} path={route.path}>
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
	return <Routes>{renderRoutes(modifiedRouter)}</Routes>;
}

export default RenderRouter;

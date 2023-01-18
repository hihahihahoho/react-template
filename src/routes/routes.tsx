import { lazy } from 'react';
import Page404 from '../pages/404/404';
// import Home from '../pages/Home/Home';
import Female from '../pages/Products/Female/Female';
import Pants from '../pages/Products/Female/Pants/Pants';
import PantsDetail from '../pages/Products/Female/Pants/PantsDetail';
import { addKeys, modifyRouterProperties } from '../utils/utils';

const Home = lazy(() => import('../pages/Home/Home'));

interface RouteConfigInterface {
	key?: string;
	title?: string | React.FC;
	component?: string | React.FC;
	icon?: React.ReactNode;
	layout?: string | React.FC;
	exact?: boolean;
	path?: string;
	fullPath?: string;
	children?: RouteConfigInterface[];
	index?: boolean;
	isHideOnMenu?: boolean;
}

const page404: RouteConfigInterface = {
	title: '404',
	component: Page404,
	path: '*',
	isHideOnMenu: true,
};

const routes: RouteConfigInterface[] = [
	{
		title: 'Trang chủ',
		component: Home,
		path: '/',
		index: true,
	},
	{
		title: 'Sản phẩm',
		path: 'products',
		index: false,
		children: [
			{
				title: 'Nam12312312',
				component: Home,
				path: 'male',
			},
			{
				title: 'Nữ',
				path: 'female',
				children: [
					{
						title: 'Tất cả',
						component: Female,
						index: true,
					},
					{
						title: 'Áo',
						component: Home,
						path: 'shirt',
					},
					{
						title: 'Quần',
						path: 'pants',
						children: [
							{
								title: 'Tất cả',
								index: true,
								component: Pants,
							},
							{
								title: 'Chi tiết quần',
								component: PantsDetail,
								isHideOnMenu: true,
								path: ':id',
							},
						],
					},
				],
			},
		],
	},
	{
		...page404,
	},
];

addKeys(routes, 'children');

const modifiedRouter: RouteConfigInterface[] = addKeys(modifyRouterProperties(routes), 'children');
console.log(modifiedRouter);
export type { RouteConfigInterface };
export { routes, page404, modifiedRouter };

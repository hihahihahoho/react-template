import _ from 'lodash';
import { page404, RouteConfigInterface } from '../routes/routes';

function addKeys<T extends { [key: string]: any }>(arr: T[], childField: string, parentKey?: string): T[] {
	return arr.map((obj, i) => {
		const key = parentKey ? `${parentKey}-${i}` : `${i}`;
		if (obj[childField]) {
			return { ...obj, key, [childField]: addKeys(obj[childField], childField, key) };
		}
		return { ...obj, key };
	});
}

export { addKeys };

export function removeTrailingSlash(str: string) {
	if (str.endsWith('/') && str.length > 1) {
		return str.slice(0, -1);
	}
	return str.replace('//', '/');
}

export function modifyRouterProperties(
	routes?: RouteConfigInterface[],
	parentRouteProp: RouteConfigInterface = {},
	includeProp: string[] = [],
	fullPath: boolean = true,
): any {
	if (!routes) {
		return;
	}

	return routes.map((route) => {
		let parentPath = parentRouteProp.fullPath;

		if (fullPath && route.path) {
			route.fullPath = removeTrailingSlash(`/${parentPath ? `${parentPath}/` : ''}${route.path}`);
		}
		if (route.index === true) {
			route.fullPath = removeTrailingSlash(`/${parentPath ? `${parentPath}` : ''}`);
		}
		const { ...routeProp } = route;
		let filteredObject: {} = {};
		if (includeProp.length) {
			filteredObject = _.pick(parentRouteProp, includeProp);
		}
		route = { ...filteredObject, ...routeProp };

		if (route.children) {
			route.children = modifyRouterProperties(route.children, route, includeProp, fullPath);
			route.children?.push(page404);
		}
		if (route.index === false && route.children) {
			route.children = route.children.map((child) => {
				child.path = `${route.path}/${child.path}`;
				return child;
			});
		}
		if (!route.component) {
			delete route.fullPath;
		}

		return route;
	});
}

export function getIdByName<T extends { id: any; name: any; children: any }>(
	arr: any,
	name: any,
	idKey: keyof T | String = 'id',
	nameKey: keyof T | String = 'name',
): any {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][nameKey] === name) {
			return arr[i][idKey];
		}
		if (arr[i].children?.length > 0) {
			const id = getIdByName(arr[i].children, name, idKey, nameKey);
			if (id) {
				return id;
			}
		}
	}
	return null;
}

export const getAncestors = (path?: string): string[] => {
	const ancestors: string[] = [];

	path?.split('-').reduce((acc: string[], curr: string) => {
		acc.push(acc.length === 0 ? curr : `${acc[acc.length - 1]}-${curr}`);
		ancestors.push(acc[acc.length - 1]);
		return acc;
	}, []);
	return ancestors;
};

export function uriToFile(uri: string, fileName: string): File {
	const byteString = atob(uri.split(',')[1]);
	const mimeString = uri.split(',')[0].split(':')[1].split(';')[0];
	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	return new File([ab], fileName, { type: mimeString });
}

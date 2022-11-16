export const isPathInArr = (path: string = '', arr: string[]): boolean =>
	arr.some((item) => path.includes(item));

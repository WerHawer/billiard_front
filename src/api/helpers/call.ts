export const call = async <T = any, R = any>(
	requestHandler: (options: T) => R,
	options: T
) => {
	try {
		return await requestHandler(options);
	} catch (error) {
		throw error;
	}
};

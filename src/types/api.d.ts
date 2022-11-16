export interface ApiCallOptions {
	ignoreErrors?: boolean;
	shouldDispatchActions?: boolean;
}

export interface ApiCallProps {
	types: [string, string, string];
	params: {
		url: string;
		method: string;
		payload?: Record<string, any>;
		queryParams?: Record<string, any>;
		useUnAuthorized?: boolean;
		customRequestHandler?: (options: any) => any;
		config?: Record<string, any>;
	};
	responseMapper?: (response: any) => any;
	meta?: Record<string, any>;
}

export interface HandleApiCallProps {
	props: ApiCallProps;
	options?: ApiCallOptions;
}

export interface ApiResponsePayload<T> {
	code: number;
	response: T;
}

export interface ApiResponse<T> {
	type: string;
	payload: ApiResponsePayload<T>;
	meta?: Record<string, any>;
}

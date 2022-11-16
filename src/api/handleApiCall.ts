import { AxiosResponse } from 'axios';
import responseHandler from './axiosSettings';
import { get, identity } from 'lodash/fp';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { call } from './helpers/call';
import { HandleApiCallProps } from '../types/api';

const defaultOptions = {
	ignoreErrors: false,
	shouldDispatchActions: true,
};

const handleApiError = createAsyncThunk(
	'handleApiError',
	async (options: any, { dispatch }) => {
		dispatch({ type: 'handleApiError', payload: options });
		console.error(options);
	}

	//	TODO: create auth error handler
);

export const handleApiCall = createAsyncThunk<
	AxiosResponse,
	HandleApiCallProps
	// @ts-ignore
>('handleApiCall', async ({ props, options }, { dispatch }) => {
	const {
		types,
		params: {
			url,
			method,
			payload,
			queryParams,
			useUnAuthorized,
			customRequestHandler,
			config,
		},
		responseMapper = identity,
		meta,
	} = props;

	const ignoreErrors = options?.ignoreErrors ?? defaultOptions.ignoreErrors;
	const shouldDispatchActions =
		options?.shouldDispatchActions ?? defaultOptions.shouldDispatchActions;

	if (types?.length !== 3 && shouldDispatchActions) {
		throw new Error('Expected an array of three action types.');
	}

	const [REQUEST_TYPE, SUCCESS_TYPE, FAILURE_TYPE] = types.map(String);

	if (shouldDispatchActions) {
		dispatch({ type: REQUEST_TYPE, meta: { ...meta, payload, queryParams } });
	}

	let originalResponse = null;

	try {
		originalResponse = await call(customRequestHandler || responseHandler, {
			method,
			url,
			data: payload,
			params: queryParams,
			...config,
		});

		const code = get('status', originalResponse);
		const responseData = get('data', originalResponse);
		const mappedData = responseMapper(responseData);

		if (shouldDispatchActions) {
			dispatch({
				type: SUCCESS_TYPE,
				payload: {
					code,
					response: mappedData,
				},
				meta,
			});
		}

		return { response: originalResponse, data: mappedData };
	} catch (rejection) {
		// if (process.env.NODE_ENV !== 'PRODUCTION') {
		// 	// eslint-disable-next-line no-console
		// 	console.error('Api call rejection', rejection);
		// }

		// @ts-ignore
		const code = get('response.status', rejection);

		// @ts-ignore
		const response = get('response.data', rejection);

		if (!ignoreErrors) {
			await call(handleApiError, {
				action: REQUEST_TYPE,
				code,
				response,
				originalResponse,
				isUnauthorizedRequest: useUnAuthorized,
				params: {
					payload,
					queryParams,
					meta,
				},
				rejection,
			});
		}

		if (shouldDispatchActions) {
			dispatch({
				type: FAILURE_TYPE,
				payload: {
					code,
					response,
				},
				meta,
			});
		}

		return { error: rejection };
	}
});

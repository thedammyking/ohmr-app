import axios from 'axios';
import { ohmrServicesBaseUrl } from './Url';

const ohmrServicesInstance = axios.create({
	baseURL: ohmrServicesBaseUrl,
	headers: {
		// "Access-Control-Allow-Origin": "*",
		post: {
			'Content-Type': 'application/json'
		}
	}
});

export const setToken = token => {
	if (token) {
		ohmrServicesInstance.defaults.headers.common[
			'Authorization'
		] = `Bearer ${token}`;
	}
};

const ohmrServicesPostRequest = (uri, body) =>
	ohmrServicesInstance.post(uri, {
		...body
	});
const ohmrServicesGetRequest = uri => ohmrServicesInstance.get(uri);

export const Auth = {
	login: body =>
		ohmrServicesPostRequest('signin', body).then(({ data, status }) => ({
			...data,
			status
		}))
};

export const Tickets = {
	generate: (body = {}) =>
		ohmrServicesPostRequest(
			'event/5d970744c5e2e10017b7c427/ticket',
			body
		).then(({ data, status }) => ({
			...data,
			status
		})),
	getAll: params =>
		ohmrServicesGetRequest('event/5d970744c5e2e10017b7c427/ticket').then(
			({ data, status }) => ({
				...data,
				status
			})
		)
};

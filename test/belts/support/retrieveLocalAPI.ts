import { getApiGatewayUrl } from "serverless-plugin-test-helper";

export function localAPIGateway () {
	const regex = /.*:\/\/([^.]+)\.execute-api[^/]+\/([^/]+)(\/.*)?/g;
	const replace = 'http://localhost:' + 4566 + '/restapis/$1/$2/_user_request_$3';
	const endpoint = getApiGatewayUrl().replace(regex, replace);

	return endpoint;
}
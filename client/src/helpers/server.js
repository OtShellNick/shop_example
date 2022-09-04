import Request from 'sbx-client-request';

export const Server = new Request({
    url: 'http://localhost:8082',
    needAuthorization: true,
});
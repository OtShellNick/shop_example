import Request from 'sbx-client-request';

export const Server = new Request({
    url: 'http://localhost:4332',
    authKey: 'Authorization'
});
import {Server} from "@helpers/server";
import * as CookieHelper from "@helpers/Cookie";

export const getSelf = () => Server.get('/v1/api')

export const registration = data => Server.post('/v1/auth/register', data);

export const login = data => Server.post('/v1/auth/login', data);

export const logout = () => {
    CookieHelper.del('Authorization');
    localStorage.removeItem('Authorization');
    return Promise.resolve(true);
}

export const getAuthorization = () => {
    return CookieHelper.get('Authorization') || localStorage.getItem('Authorization');
}
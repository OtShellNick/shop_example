import {logout} from "@actions/personal";

export const checkAuth = ({code, message, type}) => {
    if(code === 401 && location.pathname !== '/login') {
        logout().then(() => location.replace('/login'));
    }
    return {code, message, type};
}
import {Server} from "@helpers/server";

export const getSelf = () => Server.get('/v1/api')

export const registration = data => Server.post('/v1/auth/register', data);
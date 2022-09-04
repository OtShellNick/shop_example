import {Server} from "@helpers/server";

export const getSelf = () => Server.get('/v1/api')
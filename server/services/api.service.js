require('dotenv').config({path: '../.env'});
const ApiGateway = require("moleculer-web");

module.exports = {
    name: 'api',
    version: 1,
    mixins: [ApiGateway],
    settings: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        port: process.env.SERVER_PORT || 3000,
        routes: [
            {
                path: '/',
                authorization: true,
                autoAliases: true,
                cors: true,
                bodyParser: {
                    json: {
                        strict: false,
                    },
                    urlencoded: {
                        extended: false
                    }
                }
            }
        ],
        onError: (req, res, err) => {
            console.error('err', err);
        }
    },
    methods: {
      authorize: async (ctx, route, req) => {
          return 'true'
      }
    }
}
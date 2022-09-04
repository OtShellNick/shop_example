require('dotenv').config({path: '../.env'});
const ApiGateway = require("moleculer-web");
const cors = require('cors');

module.exports = {
    name: 'api',
    version: 1,
    mixins: [ApiGateway],
    settings: {
        origin: '*',
        methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
        use: [cors()],
        port: process.env.SERVER_PORT || 3000,
        routes: [
            {
                path: '/',
                authorization: true,
                autoAliases: true,
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
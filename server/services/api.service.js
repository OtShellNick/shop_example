require('dotenv').config({path: '../.env'});
const ApiGateway = require("moleculer-web");
const {Errors: {MoleculerError}} = require('moleculer');
const cors = require('cors');

module.exports = {
    name: 'api',
    version: 1,
    mixins: [ApiGateway],
    settings: {
        origin: '*',
        methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
        use: [cors({
            exposedHeaders: 'Authorization',
        })],
        port: process.env.SERVER_PORT || 3000,
        routes: [
            {
                path: '/',
                autoAliases: true,
                bodyParser: {
                    json: true,
                    urlencoded: {extended: true}
                },
                onAfterCall: ({meta}, route, req, res) => {
                    const {session} = meta;
                    if(session) res.setHeader('Authorization', session);
                },
                onError(req, res, err) {
                    let { type, code, message, data } = err;
                    this.logger.error("An Error Occurred!");
                    res.writeHead(Number(code) || 500, { 'Content-Type': 'application/json' })
                    if (err instanceof MoleculerError) res.end(JSON.stringify({ type, code, message, data }))
                    // throw new MoleculerError('Internal server error', 500)
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
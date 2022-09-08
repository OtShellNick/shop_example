const {getUserByEmail, createUser} = require("../actions/user.actions");
const {Errors: {MoleculerError}} = require('moleculer');
const {createSession} = require("../actions/sessions.actions");

module.exports = {
    name: 'auth',
    version: 1,
    actions: {
        register: {
            rest: 'POST /register',
            params: {
                name: {type: 'string', optional: false},
                email: {type: 'string', optional: false},
                password: {type: 'string', optional: false},
            },
            handler: async ({meta, params}) => {
                const {name, email, password} = params;

                try {
                    let user = await getUserByEmail(email);

                    if (!user) {
                        user = await createUser({name, email, password});
                        meta.session = await createSession(user);
                    } else {
                        throw new MoleculerError(`User ${email} already exists`, 401, 'ALREADY_EXISTS');
                    }
                } catch (e) {
                    console.log('err find user', e);
                    if (e instanceof MoleculerError) throw e;
                    throw new MoleculerError('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR')
                }
            }
        }
    }
}
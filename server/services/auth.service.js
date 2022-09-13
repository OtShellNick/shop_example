const {Errors: {MoleculerError}} = require('moleculer');
const {getUserByEmail, createUser, hash} = require("../actions/user.actions");
const {createSession, deleteSession} = require("../actions/sessions.actions");
const {addBalanceByUserId, getBalanceByUserId} = require("../actions/balance.actions");

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
                        const userBalance = await addBalanceByUserId(user._id.toString(), 400);
                        user.balance = userBalance.amount;

                        meta.session = await createSession(user);
                    } else {
                        throw new MoleculerError(`User ${email} already exists`, 401, 'ALREADY_EXISTS');
                    }
                } catch (e) {
                    console.log('err register user', e);
                    if (e instanceof MoleculerError) throw e;
                    throw new MoleculerError('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR')
                }
            }
        },
        login: {
            rest: 'POST /login',
            params: {
                email: {type: 'email', optional: false},
                password: {type: 'string', optional: false}
            },
            handler: async ({params: {email, password}, meta}) => {
                try {
                    const user = await getUserByEmail(email);

                    if(!user) throw new MoleculerError(`User ${email} not found`, 404, 'NOT_FOUND');

                    if(user.password !== hash(password)) throw new MoleculerError(`Wrong password`, 401, 'WRONG_PASSWORD');

                    const userBalance = await getBalanceByUserId(user._id.toString());
                    user.balance = userBalance.amount;

                    meta.session = await createSession(user);
                } catch (e) {
                    console.log('err login user', e);
                    if (e instanceof MoleculerError) throw e;
                    throw new MoleculerError('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR')
                }
            }
        },
        logout: {
            rest: 'POST /logout',
            params: {
                authorization: {type: 'string', optional: false},
            },
            handler: async ({params: {authorization}}) => {

                try {
                    await deleteSession(authorization);
                    return {status: 200, data: 'OK'};
                } catch (e) {
                    console.log('err logout user', e);
                    if (e instanceof MoleculerError) throw e;
                    throw new MoleculerError('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR')
                }
            }
        }
    }
}
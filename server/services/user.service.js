const {Errors: {MoleculerError}} = require('moleculer');
const {findSession} = require("../actions/sessions.actions");
const {getUserById} = require("../actions/user.actions");
const {getBalanceByUserId} = require("../actions/balance.actions");

module.exports = {
    name: 'user',
    version: 1,
    actions: {
        self: {
            rest: 'GET /self',
            handler: async ({meta: {session}}) => {

                if(!session) throw new MoleculerError('Not authorized', 401, 'NOT_AUTHORIZED');

                try {
                    const auth = await findSession(session);

                    if(!auth) throw new MoleculerError('Not authorized', 401, 'NOT_AUTHORIZED');
                    const user = await getUserById(auth.userId);
                    const userBalance = await getBalanceByUserId(user._id.toString());
                    user.balance = userBalance.amount;

                    delete user.password;
                    delete user._id;

                    return user;
                } catch (e) {
                    console.log('err get self user', e);
                    if (e instanceof MoleculerError) throw e;
                    throw new MoleculerError('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR')
                }
            }
        }
    }
}
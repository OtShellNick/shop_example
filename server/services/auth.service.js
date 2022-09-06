const {getUserByEmail, createUser} = require("../actions/user.actions");
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
            handler: async ({params}) => {
                const {name, email, password} = params;

                try {
                    let user = await getUserByEmail(email);

                    if (!user) user = await createUser({name, email, password});

                    delete user._id;
                    delete user.password;

                    return user;
                } catch (e) {
                    console.log('err find user', e);
                }
            }
        }
    }
}
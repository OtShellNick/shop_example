const {connect} = require('../db');
const {nanoid} = require("nanoid");

let sessions;

(async () => {
    if (!sessions?.isConnected()) sessions = (await connect()).collection('sessions');
})();

const createSession = async ({_id}) => {
    const session = nanoid();
    await sessions.insertOne({userId: _id.toString(), session});
    return session;
};

module.exports = {createSession};
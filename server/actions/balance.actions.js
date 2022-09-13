const {connect} = require('../db');

let balance;

(async () => {
    if (!balance?.isConnected()) balance = (await connect()).collection('balance');
})();

const addBalanceByUserId = async (userId, amount) => {
    const userBalance = {userId, amount};
    await balance.insertOne(userBalance);
    return userBalance;
};

const updateBalanceByUserId = async (userId, amount) => await balance.updateOne({userId, amount});

const getBalanceByUserId = async userId => await balance.findOne({userId});

module.exports = {addBalanceByUserId, updateBalanceByUserId, getBalanceByUserId}
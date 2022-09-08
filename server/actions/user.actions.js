const {connect} = require('../db');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

let users;

(async () => {
    if (!users?.isConnected()) users = (await connect()).collection('users');
})();

const hash = (password) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
};

const generateJwt = userId => jwt.sign(userId, process.env.SECRET_KEY);

const getUserByEmail = async (email) => await users.findOne({email});

const createUser = async (data) => {
    const newUser = {...data, role: 'user', password: hash(data.password)};
    await users.insertOne(newUser);
    return newUser;
}

module.exports = {getUserByEmail, createUser, hash}
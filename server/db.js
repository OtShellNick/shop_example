require("dotenv").config({path: '../.env'});

const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.DB_URI, {
    useUnifiedTopology: true,
});

module.exports = {
    ObjectId,
    client,
    connect: async () => {
        await client.connect();
        return await client.db("shop");
    },
    close: async () => {
        await client.close();
    }
};
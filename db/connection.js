const mongoose = require('mongoose');

require('dotenv').config();

const uriDb = process.env.MONGO_URL;

mongoose.Promise = global.Promise;

const connectionToMongo = async () => {
    return mongoose.connect(uriDb,
        {
            // promiseLibrary: global.Promise,
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
        })
}

module.exports = {
    connectionToMongo
}
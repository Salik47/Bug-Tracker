const mongoose = require('mongoose');
const { MONGO_URI, MONGO_OPTIONS } = require('../config/mongoDbConfig');

module.exports = async app => {
    try {
        await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
        console.log('Connected to MongoDB');
        app?.emit('db-connected');
    } catch (err) {
        console.log('Could not connect to MongoDB');
        console.log(err);
        process.exit(1);
    }
};

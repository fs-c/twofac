const mongoose = require('mongoose');

const connect = exports.connect = (options) => {
	const { MONGODB_NAME, MONGODB_PASSWORD } = process.env;
	const uri = `mongodb+srv://${MONGODB_NAME}:${MONGODB_PASSWORD}@`
        + options.connectString;
        
	return mongoose.connect(uri, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
    });
};

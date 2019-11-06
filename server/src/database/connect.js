const mongoose = require('mongoose');

const connect = exports.connect = () => {
	const { MONGODB_URI, MONGODB_NAME, MONGODB_PASSWORD } = process.env;
	const uri = `mongodb+srv://${MONGODB_NAME}:${MONGODB_PASSWORD}@`
        + MONGODB_URI;
        
	return mongoose.connect(uri, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
    });
};
